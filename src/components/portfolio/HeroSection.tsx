import {
  Suspense,
  useEffect,
  useState,
  lazy,
  memo,
  type CSSProperties,
} from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import type { AppCopy } from '../../i18n';
import { outfitPalettes, type OutfitPalette, type OutfitPaletteId } from '../../data/outfitPalettes';
import { documentUrl } from '../../lib/sitePaths';
import { siteDocuments, siteProfile } from '../../data/siteConfig';
import { MetricGrid } from '../common/MetricGrid';

const LazyHeroScene = lazy(async () => {
  const module = await import('../HeroScene');
  return { default: module.HeroScene };
});

type HeroSectionProps = {
  heroCopy: AppCopy['hero'];
  sceneCopy: AppCopy['scene'];
  paletteTones: Record<string, string>;
  activeOutfitId: OutfitPaletteId;
  activePalette: OutfitPalette;
  isExpanded: boolean;
  isOutfitTransitioning: boolean;
  onOutfitApplied: () => void;
  onOutfitSelect: (paletteId: OutfitPaletteId) => void;
  onToggleExpanded: () => void;
};

function SceneLoadingFallback({
  loadingLabel,
  overlayOnly = false,
}: {
  loadingLabel: string;
  overlayOnly?: boolean;
}) {
  return (
    <div className={overlayOnly ? 'scene-loader-surface' : 'scene-canvas'} aria-hidden="true">
      <div className="scene-overlay">
        <div className="scene-loader" aria-hidden="true">
          <span className="scene-loader__ring scene-loader__ring--outer" />
          <span className="scene-loader__ring scene-loader__ring--inner" />
          <span className="scene-loader__core" />
        </div>
        <div className="scene-overlay__copy">
          <strong>{loadingLabel}</strong>
        </div>
      </div>
    </div>
  );
}

export const HeroSection = memo(function HeroSection({
  heroCopy,
  sceneCopy,
  paletteTones,
  activeOutfitId,
  activePalette,
  isExpanded,
  isOutfitTransitioning,
  onOutfitApplied,
  onOutfitSelect,
  onToggleExpanded,
}: HeroSectionProps) {
  const [shouldMountHeroScene, setShouldMountHeroScene] = useState(false);
  const [isHeroSceneReady, setIsHeroSceneReady] = useState(false);
  const sceneThemeStyle = {
    '--guardian-accent': activePalette.cloak,
    '--guardian-secondary': activePalette.armor,
  } as CSSProperties;

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setShouldMountHeroScene(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  return (
    <section className="section hero-section" id="top">
      <div className="container">
        <div className="row align-items-lg-start g-5">
          <div className="col-lg-6 hero-copy-column">
            <div className="hero-copy">
              <span className="eyebrow">{heroCopy.eyebrow}</span>
              <h1 className="display-title">{heroCopy.title}</h1>
              <p className="hero-text">{heroCopy.text}</p>

              <div className="hero-pill-row">
                {heroCopy.quickFacts.map((item) => (
                  <span className="hero-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="d-flex flex-wrap gap-3 hero-actions">
                <a className="btn btn-accent btn-lg" href={siteProfile.emailHref}>
                  {heroCopy.actions.email}
                </a>
                <a
                  className="btn btn-ghost btn-lg"
                  href={siteProfile.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {heroCopy.actions.linkedIn}
                </a>
                <a
                  className="btn btn-ghost btn-lg"
                  href={siteProfile.gitHubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {heroCopy.actions.gitHub}
                </a>
                <a
                  className="btn btn-ghost btn-lg"
                  href={documentUrl(siteDocuments.resume)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {heroCopy.actions.resume}
                </a>
              </div>

              <MetricGrid items={heroCopy.stats} />
            </div>
          </div>

          <div className="col-lg-6 hero-scene-column">
            <div className={`scene-card ${isExpanded ? 'scene-card--expanded' : ''}`}>
              <div className="scene-card__layout">
                <div
                  className={`scene-stage ${isExpanded ? 'scene-stage--expanded' : ''}`}
                  style={sceneThemeStyle}
                >
                  <button
                    type="button"
                    className="scene-stage__viewport-toggle"
                    aria-pressed={isExpanded}
                    aria-label={isExpanded ? sceneCopy.restore : sceneCopy.maximize}
                    title={isExpanded ? sceneCopy.restore : sceneCopy.maximize}
                    onClick={onToggleExpanded}
                  >
                    {isExpanded ? (
                      <Minimize2 aria-hidden="true" size={18} strokeWidth={2.2} />
                    ) : (
                      <Maximize2 aria-hidden="true" size={18} strokeWidth={2.2} />
                    )}
                    <span className="visually-hidden">
                      {isExpanded ? sceneCopy.restore : sceneCopy.maximize}
                    </span>
                  </button>

                  <div className="scene-stage__hero-shell">
                    {!isHeroSceneReady ? (
                      <SceneLoadingFallback loadingLabel={sceneCopy.loading} overlayOnly />
                    ) : null}
                    {shouldMountHeroScene ? (
                      <Suspense fallback={<SceneLoadingFallback loadingLabel={sceneCopy.loading} />}>
                        <LazyHeroScene
                          outfitPaletteId={activeOutfitId}
                          animationMode="landing"
                          isExpanded={isExpanded}
                          isOutfitTransitioning={isOutfitTransitioning}
                          onOutfitApplied={onOutfitApplied}
                          onReady={() => setIsHeroSceneReady(true)}
                          labels={sceneCopy}
                        />
                      </Suspense>
                    ) : (
                      <SceneLoadingFallback loadingLabel={sceneCopy.loading} />
                    )}
                  </div>

                  <div className="scene-stage__palette-dock">
                    <div className="scene-stage__palette-header">
                      <span className="scene-stage__palette-label">
                        {activePalette.name} {sceneCopy.paletteSuffix}
                      </span>
                      <span className="scene-stage__palette-tone">
                        {paletteTones[activePalette.tone] ?? activePalette.tone}
                      </span>
                    </div>
                    <div className="scene-palette" aria-label={sceneCopy.paletteAriaLabel}>
                      {outfitPalettes.map((palette) => (
                        <button
                          key={palette.id}
                          type="button"
                          className={`scene-palette__option ${activeOutfitId === palette.id ? 'is-active' : ''}`}
                          aria-pressed={activeOutfitId === palette.id}
                          aria-label={`${palette.name} ${sceneCopy.paletteSuffix}`}
                          onClick={() => onOutfitSelect(palette.id)}
                          style={{ backgroundColor: palette.cloth }}
                        >
                          <span className="scene-palette__tooltip" aria-hidden="true">
                            <span className="scene-palette__tooltip-name">{palette.name}</span>
                            <span className="scene-palette__tooltip-tone">
                              {paletteTones[palette.tone] ?? palette.tone} {sceneCopy.paletteSuffix}
                            </span>
                          </span>
                          <span className="visually-hidden">{palette.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
