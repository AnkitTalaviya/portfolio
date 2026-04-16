import { useEffect, useState } from 'react';
import { appCopy, getInitialLanguage, type LanguageCode } from '../i18n';

export function useActiveLanguage() {
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>(getInitialLanguage);
  const copy = appCopy[activeLanguage];

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.documentElement.dir = 'ltr';
    window.localStorage.setItem('portfolio-language', activeLanguage);
  }, [activeLanguage, copy.htmlLang]);

  return {
    activeLanguage,
    copy,
    setActiveLanguage,
  };
}
