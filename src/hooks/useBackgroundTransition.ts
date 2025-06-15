import { useState, useEffect } from "react";

export function useBackgroundTransition(imageUrl: string | null) {
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [nextImageUrl, setNextImageUrl] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Evitar peticiones a null que causan errores 404
    if (!imageUrl || imageUrl === "null" || imageUrl === currentImageUrl) return;

    if (currentImageUrl) {
      // Hay imagen actual, hacer transición
      setNextImageUrl(imageUrl);
      setIsTransitioning(true);
    } else {
      // Primera carga, aplicar directamente
      setCurrentImageUrl(imageUrl);
    }
  }, [imageUrl, currentImageUrl]);

  const handleTransitionEnd = () => {
    if (nextImageUrl) {
      setCurrentImageUrl(nextImageUrl);
      setNextImageUrl(null);
      setIsTransitioning(false);
    }
  };

  return {
    currentImageUrl,
    nextImageUrl,
    isTransitioning,
    handleTransitionEnd,
  };
}
