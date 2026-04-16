import { languageOptions, type AppCopy, type LanguageCode } from '../i18n';
import { siteProfile } from '../data/siteConfig';

type SiteHeaderProps = {
  activeLanguage: LanguageCode;
  activeNav: 'about' | 'experience' | 'portfolio' | 'project' | 'skills' | 'contact';
  brandHref: string;
  copy: AppCopy;
  hrefs: {
    about: string;
    experience: string;
    portfolio: string;
    project: string;
    skills: string;
    contact: string;
  };
  isNavOpen: boolean;
  onCloseNav: () => void;
  onLanguageSelect: (languageCode: LanguageCode) => void;
  onToggleNav: () => void;
};

export function SiteHeader({
  activeLanguage,
  activeNav,
  brandHref,
  copy,
  hrefs,
  isNavOpen,
  onCloseNav,
  onLanguageSelect,
  onToggleNav,
}: SiteHeaderProps) {
  const navItems = [
    { id: 'about', href: hrefs.about, label: copy.nav.about },
    { id: 'experience', href: hrefs.experience, label: copy.nav.experience },
    { id: 'portfolio', href: hrefs.portfolio, label: copy.nav.portfolio },
    { id: 'project', href: hrefs.project, label: copy.nav.project },
    { id: 'skills', href: hrefs.skills, label: copy.nav.skills },
    { id: 'contact', href: hrefs.contact, label: copy.nav.contact },
  ] as const;

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container py-3 py-lg-4">
          <a className="navbar-brand brand-pill" href={brandHref}>
            {siteProfile.name}
          </a>
          <button
            className="nav-toggle d-lg-none"
            type="button"
            aria-expanded={isNavOpen}
            aria-controls="site-navigation"
            onClick={onToggleNav}
          >
            {copy.nav.menu}
          </button>
          <div className={`ms-auto nav-cluster ${isNavOpen ? 'is-open' : ''}`} id="site-navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={`nav-link ${activeNav === item.id ? 'is-active' : ''}`}
                href={item.href}
                aria-current={activeNav === item.id ? 'page' : undefined}
                onClick={onCloseNav}
              >
                {item.label}
              </a>
            ))}
            <div className="language-switcher" aria-label={copy.languageSwitcher.ariaLabel}>
              <span className="language-switcher__label">{copy.languageSwitcher.label}</span>
              <div className="language-switcher__list">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`language-switcher__button ${activeLanguage === option.code ? 'is-active' : ''}`}
                    aria-pressed={activeLanguage === option.code}
                    lang={option.code}
                    onClick={() => onLanguageSelect(option.code)}
                  >
                    {option.nativeLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
