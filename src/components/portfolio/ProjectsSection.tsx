import { memo } from 'react';
import type { AppCopy } from '../../i18n';
import { SectionHeading } from './SectionHeading';

type ProjectsSectionProps = {
  projectsCopy: AppCopy['projects'];
};

export const ProjectsSection = memo(function ProjectsSection({
  projectsCopy,
}: ProjectsSectionProps) {
  return (
    <section className="section section-soft" id="portfolio">
      <div className="container">
        <SectionHeading
          kicker={projectsCopy.kicker}
          title={projectsCopy.title}
          text={projectsCopy.text}
        />

        <div className="row g-4">
          {projectsCopy.items.map((project) => (
            <div className="col-lg-6" key={project.title}>
              <article className="project-card h-100">
                <div className="project-card__top">
                  <p className="project-card__eyebrow">{project.company}</p>
                  <span className="project-card__meta">{project.category}</span>
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
                {project.links ? (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
