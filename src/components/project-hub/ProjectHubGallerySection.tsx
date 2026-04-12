import { memo } from 'react';

type ProjectHubCopy = (typeof import('../../projectHubCopy').projectHubCopy)['en'];

type ProjectHubGallerySectionProps = {
  copy: ProjectHubCopy;
};

export const ProjectHubGallerySection = memo(function ProjectHubGallerySection({
  copy,
}: ProjectHubGallerySectionProps) {
  return (
    <section className="section section-soft">
      <div className="container">
        <div className="row g-4">
          {copy.cards.map((project) => (
            <div className="col-lg-6" key={project.title}>
              <article className="project-card h-100">
                <div className="project-card__top">
                  <p className="project-card__eyebrow">{project.category}</p>
                  <span className="project-card__meta">{project.kind}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul className="detail-list detail-list--tight">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="tag-row">
                  {project.tech.map((tag) => (
                    <span className="tag-chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.cta}
                  </a>
                  <a href={project.demoHref} target="_blank" rel="noreferrer">
                    {copy.demoCta}
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
