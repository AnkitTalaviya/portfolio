import { useEffect, useRef, useState } from 'react';

export function useThemeDock() {
  const [isThemeDockOpen, setIsThemeDockOpen] = useState(false);
  const themeDockRef = useRef<HTMLElement | null>(null);

  const closeThemeDock = () => {
    setIsThemeDockOpen(false);
  };

  useEffect(() => {
    if (!isThemeDockOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!themeDockRef.current?.contains(event.target as Node)) {
        closeThemeDock();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeThemeDock();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isThemeDockOpen]);

  return {
    closeThemeDock,
    isThemeDockOpen,
    setIsThemeDockOpen,
    themeDockRef,
  };
}
