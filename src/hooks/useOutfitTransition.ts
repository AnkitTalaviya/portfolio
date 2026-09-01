import { useEffect, useRef, useState } from 'react';
import { outfitPalettes, type OutfitPaletteId } from '../data/outfitPalettes';

const fallbackOutfitId: OutfitPaletteId = 'midnight';

function getStoredOutfitId() {
  if (typeof window === 'undefined') {
    return fallbackOutfitId;
  }

  const savedOutfit = window.localStorage.getItem('portfolio-outfit-palette');
  return outfitPalettes.some((palette) => palette.id === savedOutfit)
    ? (savedOutfit as OutfitPaletteId)
    : fallbackOutfitId;
}

export function useOutfitTransition() {
  // Starts on the fallback palette so the first client render matches the prerendered
  // markup, then picks up the stored palette once hydration is done.
  const [activeOutfitId, setActiveOutfitId] = useState<OutfitPaletteId>(fallbackOutfitId);
  const [isOutfitTransitioning, setIsOutfitTransitioning] = useState(false);
  const isFirstPersistRun = useRef(true);
  const outfitTransitionStartRef = useRef(0);
  const outfitTransitionTimerRef = useRef<number | null>(null);
  const activePalette =
    outfitPalettes.find((palette) => palette.id === activeOutfitId) ?? outfitPalettes[0];

  const clearOutfitTransitionTimer = () => {
    if (outfitTransitionTimerRef.current !== null) {
      window.clearTimeout(outfitTransitionTimerRef.current);
      outfitTransitionTimerRef.current = null;
    }
  };

  const queueOutfitTransition = (paletteId: OutfitPaletteId) => {
    if (paletteId === activeOutfitId) {
      return;
    }

    clearOutfitTransitionTimer();
    outfitTransitionStartRef.current = performance.now();
    setIsOutfitTransitioning(true);
    setActiveOutfitId(paletteId);
  };

  const handleOutfitApplied = () => {
    if (outfitTransitionStartRef.current === 0) {
      return;
    }

    const elapsed = performance.now() - outfitTransitionStartRef.current;
    const remaining = Math.max(0, 520 - elapsed);

    clearOutfitTransitionTimer();
    outfitTransitionTimerRef.current = window.setTimeout(() => {
      setIsOutfitTransitioning(false);
      outfitTransitionStartRef.current = 0;
      outfitTransitionTimerRef.current = null;
    }, remaining);
  };

  useEffect(() => {
    setActiveOutfitId(getStoredOutfitId());
  }, []);

  useEffect(() => {
    if (isFirstPersistRun.current) {
      isFirstPersistRun.current = false;
      return;
    }

    window.localStorage.setItem('portfolio-outfit-palette', activeOutfitId);
  }, [activeOutfitId]);

  useEffect(
    () => () => {
      clearOutfitTransitionTimer();
    },
    [],
  );

  return {
    activeOutfitId,
    activePalette,
    handleOutfitApplied,
    isOutfitTransitioning,
    queueOutfitTransition,
  };
}
