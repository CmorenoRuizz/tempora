"use client";

import React from "react";
import WeatherCard from "@/components/WeatherCard";
import LoadingState from "@/components/LoadingState";
import SearchBar from "@/components/SearchBar";
import Background from "@/components/Background";
import { ForecastSection } from "@/components/ForecastSection";
import { useWeather } from "@/hooks/useWeather";
import { useCityBackground } from "@/hooks/useCityBackground";
import { useBackgroundTransition } from "@/hooks/useBackgroundTransition";

export default function Home() {
  const { weather, loading, error, setLocation, coordinates } = useWeather();
  const { imageUrl, imageKey } = useCityBackground(weather?.city);
  const { currentImageUrl, nextImageUrl, isTransitioning, handleTransitionEnd } = 
    useBackgroundTransition(imageUrl);

  const handleCitySelect = ({
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
    name: string;
  }) => {
    setLocation(lat, lon);
  };

  // Debug: Mostrar la URL en consola cuando cambie
  React.useEffect(() => {
    if (imageUrl && imageUrl !== "null") {
      console.log("🎨 APLICANDO FONDO:", imageUrl);
    } else {
      console.log("🎨 SIN IMAGEN DE FONDO");
    }
  }, [imageUrl]);

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      <Background
        currentImageUrl={currentImageUrl}
        nextImageUrl={nextImageUrl}
        isTransitioning={isTransitioning}
        imageKey={imageKey}
        onTransitionEnd={handleTransitionEnd}
      />

      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Clima Tempora</h1>
          <p className="text-blue-200">Busca el clima de cualquier ciudad</p>
        </div>

        <SearchBar onCitySelect={handleCitySelect} />

        <LoadingState loading={loading} error={error} />

        {weather && <WeatherCard {...weather} />}

        {coordinates && (
          <ForecastSection lat={coordinates.lat} lon={coordinates.lon} />
        )}
      </main>
    </div>
  );
}
