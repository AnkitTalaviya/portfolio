import { memo } from 'react';
import type { AppCopy } from '../../i18n';
import { SectionHeading } from './SectionHeading';

type EducationSectionProps = {
  educationCopy: AppCopy['education'];
};

export const EducationSection = memo(function EducationSection({
  educationCopy,
}: EducationSectionProps) {
  return (
    <section className="section section-soft" id="education">
      <div className="container">
        <SectionHeading kicker={educationCopy.kicker} title={educationCopy.title} />

        <div className="row g-4">
          <div className="col-lg-7">
            <article className="education-card h-100">
              {educationCopy.items.map((item) => (
                <div className="education-entry" key={item.title}>
                  <div className="experience-meta">
                    <span>{item.period}</span>
                    <span>{item.place}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <ul className="detail-list detail-list--tight">
                    {item.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          </div>

          <div className="col-lg-5">
            <div className="stacked-panel">
              <article className="language-card">
                <h3>{educationCopy.languagesTitle}</h3>
                <ul className="detail-list detail-list--tight">
                  {educationCopy.spokenLanguages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              </article>

              <article className="document-card">
                <h3>{educationCopy.documentsTitle}</h3>
                <p>{educationCopy.documentsText}</p>
                <div className="project-links">
                  {educationCopy.documents.map((document) => (
                    <a href={document.href} key={document.href} target="_blank" rel="noreferrer">
                      {document.label}
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
