import { memo } from 'react';
import { ProjectCard } from '../common/ProjectCard';
import type { ProjectHubCopy } from '../../projectHubCopy';

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
              <ProjectCard
                eyebrow={project.category}
                meta={project.kind}
                title={project.title}
                summary={project.summary}
                highlights={project.highlights}
                tags={project.tech}
                links={[{ label: project.cta, href: project.href }]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
