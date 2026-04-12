import { memo } from 'react';
import type { AppCopy } from '../../i18n';
import { SectionHeading } from './SectionHeading';

type ContactSectionProps = {
  contactCopy: AppCopy['contact'];
};

export const ContactSection = memo(function ContactSection({
  contactCopy,
}: ContactSectionProps) {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta-panel">
          <div>
            <SectionHeading
              kicker={contactCopy.kicker}
              title={contactCopy.title}
              text={contactCopy.text}
              className="section-heading--compact"
              textClassName="section-text mb-0"
            />
            <div className="contact-list">
              <a href="mailto:ankittalaviya.de@gmail.com">ankittalaviya.de@gmail.com</a>
              <a href="tel:+4915560693724">+49 155 60693724</a>
              <span>{contactCopy.location}</span>
            </div>
          </div>

          <div className="cta-actions">
            <a className="btn btn-accent" href="mailto:ankittalaviya.de@gmail.com">
              {contactCopy.actions.email}
            </a>
            <a
              className="btn btn-ghost"
              href="https://www.linkedin.com/in/ankit-talaviya"
              target="_blank"
              rel="noreferrer"
            >
              {contactCopy.actions.linkedIn}
            </a>
            <a className="btn btn-ghost" href="#top">
              {contactCopy.actions.backToTop}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
