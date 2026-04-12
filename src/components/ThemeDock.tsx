import { memo } from 'react';
import type { AppCopy } from '../i18n';
import { themeGroups, themes, type ThemeId } from '../data/themes';

type ThemeDockProps = {
  activeTheme: ThemeId;
  isOpen: boolean;
  onThemeSelect: (themeId: ThemeId) => void;
  onToggle: () => void;
  selectorCopy: AppCopy['theme'];
};

export const ThemeDock = memo(function ThemeDock({
  activeTheme,
  isOpen,
  onThemeSelect,
  onToggle,
  selectorCopy,
}: ThemeDockProps) {
  const activeThemeConfig = themes.find((theme) => theme.id === activeTheme) ?? themes[0];

  return (
    <>
      <button
        type="button"
        className="theme-dock__toggle"
        aria-expanded={isOpen}
        aria-controls="theme-panel"
        onClick={onToggle}
      >
        <span className="theme-dock__toggle-copy">
          <span className="theme-dock__toggle-title">{selectorCopy.label}</span>
          <span className="theme-dock__toggle-value">{activeThemeConfig.name}</span>
        </span>
        <span className="theme-dock__toggle-swatches" aria-hidden="true">
          {activeThemeConfig.swatches.map((swatch) => (
            <span
              key={swatch}
              className="theme-swatch theme-swatch--toggle"
              style={{ backgroundColor: swatch }}
            />
          ))}
        </span>
      </button>

      <section
        className="theme-panel theme-panel--floating"
        id="theme-panel"
        aria-labelledby="theme-panel-title"
      >
        <p className="theme-panel__eyebrow" id="theme-panel-title">
          {selectorCopy.panelTitle}
        </p>
        {themeGroups.map((group) => (
          <div className="theme-group" key={group.id}>
            <p className="theme-group__title">{selectorCopy.groups[group.id]}</p>
            <div className="theme-grid">
              {group.items.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-option ${activeTheme === theme.id ? 'is-active' : ''}`}
                  aria-pressed={activeTheme === theme.id}
                  title={`${theme.name} ${selectorCopy.label}`}
                  onClick={() => onThemeSelect(theme.id)}
                >
                  <span className="theme-option__swatches" aria-hidden="true">
                    {theme.swatches.map((swatch) => (
                      <span
                        key={swatch}
                        className="theme-swatch"
                        style={{ backgroundColor: swatch }}
                      />
                    ))}
                  </span>
                  <span className="theme-option__label">{theme.name}</span>
                  <span className="theme-option__tone">
                    {selectorCopy.tones[theme.toneKey]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
});
