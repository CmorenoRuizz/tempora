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

      <main className="relative z-20 flex flex-col items-center justify-start min-h-screen p-4 pt-8">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Clima Tempora
            </h1>
            <p className="text-white/80 text-lg">Busca el clima de cualquier ciudad</p>
          </div>

          <div className="flex justify-center">
            <SearchBar onCitySelect={handleCitySelect} />
          </div>

          <LoadingState loading={loading} error={error} />

          {weather && (
            <div className="flex justify-center">
              <WeatherCard {...weather} />
            </div>
          )}

          {coordinates && (
            <ForecastSection lat={coordinates.lat} lon={coordinates.lon} />
          )}
        </div>
      </main>
    </div>
  );
}
