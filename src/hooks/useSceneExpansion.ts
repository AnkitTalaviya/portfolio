import { useEffect, useState } from 'react';

export function useSceneExpansion() {
  const [isSceneExpanded, setIsSceneExpanded] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isSceneExpanded) {
      document.body.style.overflow = 'hidden';
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSceneExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSceneExpanded]);

  return {
    isSceneExpanded,
    setIsSceneExpanded,
  };
}
