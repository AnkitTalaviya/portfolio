import { memo } from 'react';
import { SectionHeading } from '../portfolio/SectionHeading';
import type { ProjectHubCopy } from '../../projectHubCopy';

type ProjectHubHeroSectionProps = {
  copy: ProjectHubCopy;
};

export const ProjectHubHeroSection = memo(function ProjectHubHeroSection({
  copy,
}: ProjectHubHeroSectionProps) {
  return (
    <section className="section hero-section">
      <div className="container">
        <SectionHeading
          kicker={copy.kicker}
          title={copy.title}
          text={copy.text}
          className="project-hub-heading"
          titleTag="h1"
          titleClassName="display-title project-hub-title"
          textClassName="hero-text project-hub-text"
        />

        <article className="project-card project-stack-panel">
          <h3>{copy.skillsHeading}</h3>
          <p>{copy.skillsText}</p>
          <div className="project-skill-groups">
            {copy.skillGroups.map((group) => (
              <section className="project-skill-group" key={group.title}>
                <h4>{group.title}</h4>
                <div className="tag-row">
                  {group.items.map((skill) => (
                    <span className="tag-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
});
