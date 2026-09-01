import { useEffect, useRef, useState } from 'react';
import { appCopy, defaultLanguage, getPreferredLanguage, type LanguageCode } from '../i18n';

export function useActiveLanguage() {
  // The page is prerendered in the default language, so the first client render has to
  // match it. The stored or browser language is applied right after hydration.
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>(defaultLanguage);
  const isFirstPersistRun = useRef(true);
  const copy = appCopy[activeLanguage];

  useEffect(() => {
    setActiveLanguage(getPreferredLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.documentElement.dir = 'ltr';

    if (isFirstPersistRun.current) {
      isFirstPersistRun.current = false;
      return;
    }

    window.localStorage.setItem('portfolio-language', activeLanguage);
  }, [activeLanguage, copy.htmlLang]);

  return {
    activeLanguage,
    copy,
    setActiveLanguage,
  };
}
