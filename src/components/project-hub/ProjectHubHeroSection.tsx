import { memo } from 'react';
import { SectionHeading } from '../portfolio/SectionHeading';
import { MetricGrid } from '../common/MetricGrid';
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

        <MetricGrid items={copy.stats} />
      </div>
    </section>
  );
});
