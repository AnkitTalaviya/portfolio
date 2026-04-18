import { siteHref } from '../../lib/sitePaths';
import { Link } from 'react-router-dom';

type ProjectCardLink = {
  label: string;
  href: string;
};

type ProjectCardProps = {
  eyebrow: string;
  meta: string;
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  links?: ProjectCardLink[];
};

export function ProjectCard({
  eyebrow,
  highlights,
  links,
  meta,
  summary,
  tags,
  title,
}: ProjectCardProps) {
  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:');

  return (
    <article className="project-card h-100">
      <div className="project-card__top">
        <p className="project-card__eyebrow">{eyebrow}</p>
        <span className="project-card__meta">{meta}</span>
      </div>
      <h3>{title}</h3>
      <p>{summary}</p>
      <ul className="detail-list detail-list--tight">
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="tag-row">
        {tags.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      {links?.length ? (
        <div className="project-links">
          {links.map((link) =>
            isExternalLink(link.href) ? (
              <a href={siteHref(link.href)} key={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ) : (
              <Link to={link.href} key={link.href}>
                {link.label}
              </Link>
            ),
          )}
        </div>
      ) : null}
    </article>
  );
}
