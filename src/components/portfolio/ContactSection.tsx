import { memo } from 'react';
import type { AppCopy } from '../../i18n';
import { siteProfile } from '../../data/siteConfig';
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
              <a href={siteProfile.emailHref}>{siteProfile.email}</a>
              <a href={siteProfile.phoneHref}>{siteProfile.phoneLabel}</a>
              <span>{contactCopy.location}</span>
            </div>
          </div>

          <div className="cta-actions">
            <a className="btn btn-accent" href={siteProfile.emailHref}>
              {contactCopy.actions.email}
            </a>
            <a
              className="btn btn-ghost"
              href={siteProfile.linkedInUrl}
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
