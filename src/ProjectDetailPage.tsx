import { Link, Navigate, useParams } from 'react-router-dom';
import { SiteScaffold } from './components/SiteScaffold';
import { projectPageNavHrefs } from './data/siteConfig';
import { useActiveLanguage } from './hooks/useActiveLanguage';
import { useStoredThemeEffect } from './hooks/useThemePreference';
import { projectDetailsCopy, type ProjectDetailId } from './projectDetailsCopy';

export default function ProjectDetailPage() {
  const { activeLanguage, copy, setActiveLanguage } = useActiveLanguage();
  const { projectId } = useParams<{ projectId: string }>();
  useStoredThemeEffect();

  if (!projectId || !(projectId in projectDetailsCopy)) {
    return <Navigate to="/projects" replace />;
  }

  const project = projectDetailsCopy[projectId as ProjectDetailId];

  return (
    <SiteScaffold
      activeLanguage={activeLanguage}
      activeNav="project"
      brandHref="/#top"
      copy={copy}
      hrefs={projectPageNavHrefs}
      onLanguageSelect={setActiveLanguage}
    >
      <section className="section hero-section">
        <div className="container">
          <article className="project-card">
            <div className="project-card__top">
              <p className="project-card__eyebrow">{project.category}</p>
              <span className="project-card__meta">{project.kind}</span>
            </div>
            <h1 className="section-title">{project.title}</h1>
            <p>{project.summary}</p>
            <div className="project-links">
              {project.links.map((link) => (
                <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
              <Link to="/projects">All projects</Link>
            </div>
            <div className="row g-3 mt-1">
              {project.stats.map((stat) => (
                <div className="col-md-4" key={stat.title}>
                  <article className="project-card h-100">
                    <h3>{stat.title}</h3>
                    <p>{stat.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8 stacked-panel">
              <article className="project-card">
                <h3>{project.overviewTitle}</h3>
                <p>{project.overviewText}</p>
                <ul className="detail-list">
                  {project.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="project-card">
                <h3>{project.modulesTitle}</h3>
                <ol className="detail-list">
                  {project.modules.map((module) => (
                    <li key={module.title}>
                      <strong>{module.title}</strong> {module.description}
                    </li>
                  ))}
                </ol>
              </article>
            </div>

            <div className="col-lg-4 stacked-panel">
              <article className="project-card">
                <h3>Stack</h3>
                <div className="tag-row">
                  {project.stack.map((tag) => (
                    <span className="tag-chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <article className="project-card">
                <h3>Key outcomes</h3>
                <ul className="detail-list detail-list--tight">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>
    </SiteScaffold>
  );
}
