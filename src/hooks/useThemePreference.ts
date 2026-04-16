import { useEffect, useState } from 'react';
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
  const [activeTheme, setActiveTheme] = useState<ThemeId>(getStoredThemeId);

  useEffect(() => {
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
