import { SiteScaffold } from './components/SiteScaffold';
import { ProjectHubGallerySection } from './components/project-hub/ProjectHubGallerySection';
import { ProjectHubHeroSection } from './components/project-hub/ProjectHubHeroSection';
import { projectPageNavHrefs } from './data/siteConfig';
import { useActiveLanguage } from './hooks/useActiveLanguage';
import { useStoredThemeEffect } from './hooks/useThemePreference';
import { projectHubCopy } from './projectHubCopy';

function ProjectsPage() {
  const { activeLanguage, copy, setActiveLanguage } = useActiveLanguage();
  const projectHub = projectHubCopy[activeLanguage];
  useStoredThemeEffect();

  return (
    <SiteScaffold
        activeLanguage={activeLanguage}
        activeNav="project"
      brandHref="/#top"
        copy={copy}
        hrefs={projectPageNavHrefs}
        onLanguageSelect={setActiveLanguage}
      >
      <ProjectHubHeroSection copy={projectHub} />
      <ProjectHubGallerySection copy={projectHub} />
    </SiteScaffold>
  );
}

export default ProjectsPage;
