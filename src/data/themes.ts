import type { ThemeToneKey } from '../i18n';

export type ThemeId =
  | 'ember'
  | 'lagoon'
  | 'evergreen'
  | 'sunrise'
  | 'slate'
  | 'sandstone';

export type ThemeMode = 'dark' | 'light';

export type ThemeOption = {
  id: ThemeId;
  name: string;
  mode: ThemeMode;
  toneKey: ThemeToneKey;
  swatches: readonly [string, string, string];
};

export const themes: readonly ThemeOption[] = [
  {
    id: 'ember',
    name: 'Ember',
    mode: 'dark',
    toneKey: 'warm',
    swatches: ['#ff8a5b', '#5ed6c2', '#ffe0b3'],
  },
  {
    id: 'lagoon',
    name: 'Lagoon',
    mode: 'dark',
    toneKey: 'cool',
    swatches: ['#7dc9ff', '#5ed6c2', '#d8f3ff'],
  },
  {
    id: 'evergreen',
    name: 'Evergreen',
    mode: 'dark',
    toneKey: 'calm',
    swatches: ['#6fcf97', '#db9154', '#f0dfb4'],
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    mode: 'light',
    toneKey: 'warm',
    swatches: ['#fdf5ef', '#f2785c', '#f0b15b'],
  },
  {
    id: 'slate',
    name: 'Porcelain',
    mode: 'light',
    toneKey: 'clean',
    swatches: ['#f4f7fa', '#8fbcd4', '#c9d6df'],
  },
  {
    id: 'sandstone',
    name: 'Sandstone',
    mode: 'light',
    toneKey: 'earthy',
    swatches: ['#f7efe2', '#cf8c5a', '#8db596'],
  },
] as const;

export const themeGroups = [
  {
    id: 'dark',
    items: themes.filter((theme) => theme.mode === 'dark'),
  },
  {
    id: 'light',
    items: themes.filter((theme) => theme.mode === 'light'),
  },
] as const;
