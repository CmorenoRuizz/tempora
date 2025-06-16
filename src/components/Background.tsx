import React from "react";

interface BackgroundProps {
  currentImageUrl: string | null;
  nextImageUrl: string | null;
  isTransitioning: boolean;
  imageKey: string;
  onTransitionEnd: () => void;
}

export default function Background({
  currentImageUrl,
  nextImageUrl,
  isTransitioning,
  imageKey,
  onTransitionEnd,
}: BackgroundProps) {
  return (
    <>
      {/* Capa de fondo base (azul cuando no hay imagen) */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${
          currentImageUrl ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Imagen de fondo actual */}
      {currentImageUrl && (
        <div
          key={`current-${imageKey}`}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ 
            backgroundImage: `url("${currentImageUrl}")`,
          }}
        />
      )}

      {/* Imagen de fondo siguiente (para transición) */}
      {nextImageUrl && (
        <div
          key={`next-${imageKey}`}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url("${nextImageUrl}")`,
          }}
          onTransitionEnd={onTransitionEnd}
        />
      )}

      {/* Overlay para oscurecer el fondo cuando hay imagen */}
      {currentImageUrl && (
        <div
          className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        />
      )}
    </>
  );
}
