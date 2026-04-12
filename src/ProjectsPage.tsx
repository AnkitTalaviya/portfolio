import { useEffect, useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { ProjectHubGallerySection } from './components/project-hub/ProjectHubGallerySection';
import { ProjectHubHeroSection } from './components/project-hub/ProjectHubHeroSection';
import { appCopy, getInitialLanguage, type LanguageCode } from './i18n';
import { projectHubCopy } from './projectHubCopy';

function ProjectsPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>(getInitialLanguage);

  const copy = appCopy[activeLanguage];
  const projectHub = projectHubCopy[activeLanguage];

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const handleLanguageSelect = (languageCode: LanguageCode) => {
    setActiveLanguage(languageCode);

    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      closeNav();
    }
  };

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.documentElement.dir = 'ltr';
    window.localStorage.setItem('portfolio-language', activeLanguage);
  }, [activeLanguage, copy.htmlLang]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    document.documentElement.dataset.theme = savedTheme ?? 'ember';
  }, []);

  return (
    <div className="app-shell">
      <SiteHeader
        activeLanguage={activeLanguage}
        activeNav="project"
        brandHref="index.html#top"
        copy={copy}
        hrefs={{
          about: 'index.html#about',
          experience: 'index.html#experience',
          portfolio: 'index.html#portfolio',
          project: 'projects.html',
          skills: 'index.html#skills',
          contact: 'index.html#contact',
        }}
        isNavOpen={isNavOpen}
        onCloseNav={closeNav}
        onLanguageSelect={handleLanguageSelect}
        onToggleNav={() => setIsNavOpen((open) => !open)}
      />

      <main>
        <ProjectHubHeroSection copy={projectHub} />
        <ProjectHubGallerySection copy={projectHub} />
      </main>
    </div>
  );
}

export default ProjectsPage;
