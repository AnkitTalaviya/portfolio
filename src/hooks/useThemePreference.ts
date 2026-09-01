import { useEffect, useRef, useState } from 'react';
import { themes, type ThemeId } from '../data/themes';

const fallbackThemeId: ThemeId = 'ember';

export function getStoredThemeId() {
  if (typeof window === 'undefined') {
    return fallbackThemeId;
  }

  const savedTheme = window.localStorage.getItem('portfolio-theme');
  return themes.some((theme) => theme.id === savedTheme) ? (savedTheme as ThemeId) : fallbackThemeId;
}

export function applyDocumentTheme(themeId: ThemeId) {
  document.documentElement.dataset.theme = themeId;
}

export function useThemePreference() {
  // The prerendered markup uses the fallback theme, so the first client render has to as
  // well. The boot script in index.html has already applied the stored theme to <html>,
  // which is why the first pass of the effect below does not touch the document.
  const [activeTheme, setActiveTheme] = useState<ThemeId>(fallbackThemeId);
  const isFirstApplyRun = useRef(true);

  useEffect(() => {
    setActiveTheme(getStoredThemeId());
  }, []);

  useEffect(() => {
    if (isFirstApplyRun.current) {
      isFirstApplyRun.current = false;
      return;
    }

    applyDocumentTheme(activeTheme);
    window.localStorage.setItem('portfolio-theme', activeTheme);
  }, [activeTheme]);

  return {
    activeTheme,
    setActiveTheme,
  };
}

export function useStoredThemeEffect() {
  useEffect(() => {
    applyDocumentTheme(getStoredThemeId());
  }, []);
}
