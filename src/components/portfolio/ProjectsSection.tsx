import { memo } from 'react';
import type { AppCopy } from '../../i18n';
import { ProjectCard } from '../common/ProjectCard';
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
              <ProjectCard
                eyebrow={project.company}
                meta={project.category}
                title={project.title}
                summary={project.summary}
                highlights={project.highlights}
                tags={project.tech}
                links={project.links}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
