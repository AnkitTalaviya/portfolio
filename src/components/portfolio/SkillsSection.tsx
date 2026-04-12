import { memo } from 'react';
import type { AppCopy } from '../../i18n';
import { SectionHeading } from './SectionHeading';

type SkillsSectionProps = {
  skillsCopy: AppCopy['skills'];
};

export const SkillsSection = memo(function SkillsSection({ skillsCopy }: SkillsSectionProps) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          kicker={skillsCopy.kicker}
          title={skillsCopy.title}
          text={skillsCopy.text}
        />

        <div className="row g-4">
          {skillsCopy.groups.map((group) => (
            <div className="col-md-6 col-xl-3" key={group.title}>
              <article className="skill-card h-100">
                <h3>{group.title}</h3>
                <div className="tag-row">
                  {group.items.map((item) => (
                    <span className="tag-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
