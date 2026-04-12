import { useEffect, useRef, useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { ThemeDock } from './components/ThemeDock';
import { AboutSection } from './components/portfolio/AboutSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { EducationSection } from './components/portfolio/EducationSection';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { HeroSection } from './components/portfolio/HeroSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { outfitPalettes, type OutfitPaletteId } from './data/outfitPalettes';
import { themes, type ThemeId } from './data/themes';
import { appCopy, getInitialLanguage, paletteToneLabels, type LanguageCode } from './i18n';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isThemeDockOpen, setIsThemeDockOpen] = useState(false);
  const [isSceneExpanded, setIsSceneExpanded] = useState(false);
  const [isOutfitTransitioning, setIsOutfitTransitioning] = useState(false);
  const themeDockRef = useRef<HTMLElement | null>(null);
  const outfitTransitionStartRef = useRef(0);
  const outfitTransitionTimerRef = useRef<number | null>(null);
  const [activeOutfitId, setActiveOutfitId] = useState<OutfitPaletteId>(() => {
    if (typeof window === 'undefined') {
      return 'midnight';
    }

    const savedOutfit = window.localStorage.getItem('portfolio-outfit-palette');
    return outfitPalettes.some((palette) => palette.id === savedOutfit)
      ? (savedOutfit as OutfitPaletteId)
      : 'midnight';
  });
  const [activeTheme, setActiveTheme] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') {
      return 'ember';
    }

    const savedTheme = window.localStorage.getItem('portfolio-theme');
    return themes.some((theme) => theme.id === savedTheme) ? (savedTheme as ThemeId) : 'ember';
  });
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>(getInitialLanguage);

  const copy = appCopy[activeLanguage];
  const paletteTones = paletteToneLabels[activeLanguage];
  const activePalette =
    outfitPalettes.find((palette) => palette.id === activeOutfitId) ?? outfitPalettes[0];

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const closeThemeDock = () => {
    setIsThemeDockOpen(false);
  };

  const clearOutfitTransitionTimer = () => {
    if (outfitTransitionTimerRef.current !== null) {
      window.clearTimeout(outfitTransitionTimerRef.current);
      outfitTransitionTimerRef.current = null;
    }
  };

  const queueOutfitTransition = (paletteId: OutfitPaletteId) => {
    if (paletteId === activeOutfitId) {
      return;
    }

    clearOutfitTransitionTimer();
    outfitTransitionStartRef.current = performance.now();
    setIsOutfitTransitioning(true);
    setActiveOutfitId(paletteId);
  };

  const handleOutfitApplied = () => {
    if (outfitTransitionStartRef.current === 0) {
      return;
    }

    const elapsed = performance.now() - outfitTransitionStartRef.current;
    const remaining = Math.max(0, 520 - elapsed);

    clearOutfitTransitionTimer();
    outfitTransitionTimerRef.current = window.setTimeout(() => {
      setIsOutfitTransitioning(false);
      outfitTransitionStartRef.current = 0;
      outfitTransitionTimerRef.current = null;
    }, remaining);
  };

  const handleThemeSelect = (themeId: ThemeId) => {
    setActiveTheme(themeId);

    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      closeThemeDock();
    }
  };

  const handleLanguageSelect = (languageCode: LanguageCode) => {
    setActiveLanguage(languageCode);

    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      closeNav();
    }
  };

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme;
    window.localStorage.setItem('portfolio-theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    window.localStorage.setItem('portfolio-outfit-palette', activeOutfitId);
  }, [activeOutfitId]);

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.documentElement.dir = 'ltr';
    window.localStorage.setItem('portfolio-language', activeLanguage);
  }, [activeLanguage, copy.htmlLang]);

  useEffect(() => {
    document.documentElement.style.setProperty('--guardian-accent', activePalette.cloak);
    document.documentElement.style.setProperty('--guardian-secondary', activePalette.armor);
  }, [activePalette.armor, activePalette.cloak]);

  useEffect(
    () => () => {
      clearOutfitTransitionTimer();
    },
    [],
  );

  useEffect(() => {
    if (!isThemeDockOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!themeDockRef.current?.contains(event.target as Node)) {
        closeThemeDock();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeThemeDock();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isThemeDockOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isSceneExpanded) {
      document.body.style.overflow = 'hidden';
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSceneExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSceneExpanded]);

  return (
    <div className="app-shell">
      <SiteHeader
        activeLanguage={activeLanguage}
        activeNav="portfolio"
        brandHref="#top"
        copy={copy}
        hrefs={{
          about: '#about',
          experience: '#experience',
          portfolio: '#portfolio',
          project: 'projects.html',
          skills: '#skills',
          contact: '#contact',
        }}
        isNavOpen={isNavOpen}
        onCloseNav={closeNav}
        onLanguageSelect={handleLanguageSelect}
        onToggleNav={() => setIsNavOpen((open) => !open)}
      />

      <aside
        ref={themeDockRef}
        className={`theme-dock ${isThemeDockOpen ? 'is-open' : ''}`}
        aria-label={copy.theme.selectorAriaLabel}
      >
        <ThemeDock
          activeTheme={activeTheme}
          isOpen={isThemeDockOpen}
          onThemeSelect={handleThemeSelect}
          onToggle={() => setIsThemeDockOpen((open) => !open)}
          selectorCopy={copy.theme}
        />
      </aside>

      <main>
        <HeroSection
          heroCopy={copy.hero}
          sceneCopy={copy.scene}
          paletteTones={paletteTones}
          activeOutfitId={activeOutfitId}
          activePalette={activePalette}
          isExpanded={isSceneExpanded}
          isOutfitTransitioning={isOutfitTransitioning}
          onOutfitApplied={handleOutfitApplied}
          onOutfitSelect={queueOutfitTransition}
          onToggleExpanded={() => setIsSceneExpanded((current) => !current)}
        />
        <AboutSection aboutCopy={copy.about} />
        <ExperienceSection experienceCopy={copy.experience} />
        <ProjectsSection projectsCopy={copy.projects} />
        <SkillsSection skillsCopy={copy.skills} />
        <EducationSection educationCopy={copy.education} />
        <ContactSection contactCopy={copy.contact} />
      </main>
    </div>
  );
}

export default App;
