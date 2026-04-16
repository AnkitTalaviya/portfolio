import { useState, type ReactNode } from 'react';
import type { AppCopy, LanguageCode } from '../i18n';
import { SiteHeader } from './SiteHeader';

type SiteScaffoldProps = {
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
  onLanguageSelect: (languageCode: LanguageCode) => void;
  themeDock?: ReactNode;
  children: ReactNode;
};

export function SiteScaffold({
  activeLanguage,
  activeNav,
  brandHref,
  children,
  copy,
  hrefs,
  onLanguageSelect,
  themeDock,
}: SiteScaffoldProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const handleLanguageSelect = (languageCode: LanguageCode) => {
    onLanguageSelect(languageCode);

    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      closeNav();
    }
  };

  return (
    <div className="app-shell">
      <SiteHeader
        activeLanguage={activeLanguage}
        activeNav={activeNav}
        brandHref={brandHref}
        copy={copy}
        hrefs={hrefs}
        isNavOpen={isNavOpen}
        onCloseNav={closeNav}
        onLanguageSelect={handleLanguageSelect}
        onToggleNav={() => setIsNavOpen((open) => !open)}
      />

      {themeDock}

      <main>{children}</main>
    </div>
  );
}
