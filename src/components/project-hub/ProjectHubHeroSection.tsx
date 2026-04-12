import { memo } from 'react';
import { SectionHeading } from '../portfolio/SectionHeading';

type ProjectHubCopy = (typeof import('../../projectHubCopy').projectHubCopy)['en'];

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

        <div className="metric-grid">
          {copy.stats.map((item) => (
            <div className="metric-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
