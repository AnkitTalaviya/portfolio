import { memo } from 'react';
import type { AppCopy } from '../../i18n';
import { SectionHeading } from './SectionHeading';

type ExperienceSectionProps = {
  experienceCopy: AppCopy['experience'];
};

export const ExperienceSection = memo(function ExperienceSection({
  experienceCopy,
}: ExperienceSectionProps) {
  return (
    <section className="section section-soft" id="experience">
      <div className="container">
        <SectionHeading
          kicker={experienceCopy.kicker}
          title={experienceCopy.title}
          text={experienceCopy.text}
        />

        <div className="row g-4">
          {experienceCopy.items.map((item) => (
            <div className="col-lg-6" key={item.company}>
              <article className="experience-card h-100">
                <div className="experience-card__top">
                  <p className="project-card__eyebrow">{item.company}</p>
                  <div className="experience-meta">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
                <h3>{item.role}</h3>
                <p className="experience-summary">{item.summary}</p>
                <ul className="detail-list">
                  {item.achievements.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
