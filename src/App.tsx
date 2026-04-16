import { useEffect } from 'react';
import { SiteScaffold } from './components/SiteScaffold';
import { ThemeDock } from './components/ThemeDock';
import { AboutSection } from './components/portfolio/AboutSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { EducationSection } from './components/portfolio/EducationSection';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { HeroSection } from './components/portfolio/HeroSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import type { ThemeId } from './data/themes';
import { portfolioNavHrefs } from './data/siteConfig';
import { paletteToneLabels } from './i18n';
import { useActiveLanguage } from './hooks/useActiveLanguage';
import { useOutfitTransition } from './hooks/useOutfitTransition';
import { useSceneExpansion } from './hooks/useSceneExpansion';
import { useThemeDock } from './hooks/useThemeDock';
import { useThemePreference } from './hooks/useThemePreference';

function App() {
  const { activeLanguage, copy, setActiveLanguage } = useActiveLanguage();
  const { activeTheme, setActiveTheme } = useThemePreference();
  const {
    activeOutfitId,
    activePalette,
    handleOutfitApplied,
    isOutfitTransitioning,
    queueOutfitTransition,
  } = useOutfitTransition();
  const { isSceneExpanded, setIsSceneExpanded } = useSceneExpansion();
  const { closeThemeDock, isThemeDockOpen, setIsThemeDockOpen, themeDockRef } = useThemeDock();
  const paletteTones = paletteToneLabels[activeLanguage];

  const handleThemeSelect = (themeId: ThemeId) => {
    setActiveTheme(themeId);

    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      closeThemeDock();
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--guardian-accent', activePalette.cloak);
    document.documentElement.style.setProperty('--guardian-secondary', activePalette.armor);
  }, [activePalette.armor, activePalette.cloak]);

  return (
    <SiteScaffold
      activeLanguage={activeLanguage}
      activeNav="portfolio"
      brandHref="#top"
      copy={copy}
      hrefs={portfolioNavHrefs}
      onLanguageSelect={setActiveLanguage}
      themeDock={
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
      }
    >
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
    </SiteScaffold>
  );
}

export default App;
