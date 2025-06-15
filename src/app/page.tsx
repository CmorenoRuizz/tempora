"use client";

import React from "react";
import WeatherCard from "@/components/WeatherCard";
import LoadingState from "@/components/LoadingState";
import SearchBar from "@/components/SearchBar";
import { useWeather } from "@/hooks/useWeather";
import { useCityBackground } from "@/hooks/useCityBackground";

export default function Home() {
  const { weather, loading, error, setLocation } = useWeather();
  const { imageUrl } = useCityBackground(weather?.city);

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
    if (imageUrl) {
      console.log("🎨 APLICANDO FONDO:", imageUrl);
    } else {
      console.log("🎨 SIN IMAGEN DE FONDO");
    }
  }, [imageUrl]);

  return (
    <div
      className={`
        relative text-white min-h-screen w-full 
        bg-cover bg-center bg-no-repeat bg-fixed 
        ${imageUrl ? "" : "bg-blue-900"}
      `}
      style={{
        backgroundImage: imageUrl ? `url("${imageUrl}")` : "none",
      }}
    >
      {/* Overlay para oscurecer el fondo cuando hay imagen */}
      {imageUrl && (
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        />
      )}

      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Clima Tempora</h1>
          <p className="text-blue-200">Busca el clima de cualquier ciudad</p>
        </div>

        <SearchBar onCitySelect={handleCitySelect} />

        <LoadingState loading={loading} error={error} />

        {weather && <WeatherCard {...weather} />}

        
      </main>
    </div>
  );
}
