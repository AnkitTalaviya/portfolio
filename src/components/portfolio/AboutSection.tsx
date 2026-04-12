import { memo } from 'react';
import type { AppCopy } from '../../i18n';
import { SectionHeading } from './SectionHeading';

type AboutSectionProps = {
  aboutCopy: AppCopy['about'];
};

export const AboutSection = memo(function AboutSection({ aboutCopy }: AboutSectionProps) {
  return (
    <section className="section section-soft" id="about">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <SectionHeading
              kicker={aboutCopy.kicker}
              title={aboutCopy.title}
              text={aboutCopy.text}
              className="section-heading--compact"
            />
          </div>

          <div className="col-lg-7">
            <div className="row g-4">
              {aboutCopy.cards.map((card) => (
                <div className="col-md-4" key={card.title}>
                  <article className="info-card h-100">
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
