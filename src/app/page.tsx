"use client"

import React from "react"
import WeatherCard from "@/components/WeatherCard"
import LoadingState from "@/components/LoadingState"
import SearchBar from "@/components/SearchBar"
import Background from "@/components/Background"
import { ForecastSection } from "@/components/ForecastSection"
import { useWeather } from "@/hooks/useWeather"
import { useCityBackground } from "@/hooks/useCityBackground"
import { useBackgroundTransition } from "@/hooks/useBackgroundTransition"

export default function Home() {
  const { weather, loading, error, setLocation, coordinates } = useWeather()
  const { imageUrl, imageKey } = useCityBackground(weather?.city)
  const { currentImageUrl, nextImageUrl, isTransitioning, handleTransitionEnd } = useBackgroundTransition(imageUrl)

  const handleCitySelect = ({
    lat,
    lon,
  }: {
    lat: number
    lon: number
    name: string
  }) => {
    setLocation(lat, lon)
  }

  // Debug: Mostrar la URL en consola cuando cambie
  React.useEffect(() => {
    if (imageUrl && imageUrl !== "null") {
      console.log("🎨 APLICANDO FONDO:", imageUrl)
    } else {
      console.log("🎨 SIN IMAGEN DE FONDO")
    }
  }, [imageUrl])

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
        {/* Contenedor principal único con glassmorphism - max-w-7xl */}
        <div className="max-w-7xl w-full mx-auto p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
          {/* Título y subtítulo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Clima Tempora
            </h1>
            <p className="text-white/80 text-lg">Busca el clima de cualquier ciudad</p>
          </div>

          {/* Loading State */}
          <div className="mb-6">
            <LoadingState loading={loading} error={error} />
          </div>

          {/* Contenido principal cuando hay datos */}
          {(weather || coordinates) && (
            <div className="space-y-4">
              {/* Barra de búsqueda - mismo ancho que pronóstico de 5 días */}
              <div className="w-full flex justify-center">
                <SearchBar onCitySelect={handleCitySelect} />
              </div>

              {/* Flexbox principal: Clima actual (izquierda) + Pronóstico por hora (derecha) */}
              <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                {/* Clima actual - ancho fijo */}
                {weather && (
                  <div className="lg:w-80 flex-shrink-0 flex">
                    <div className="w-full flex flex-col h-[420px]">
                      <WeatherCard {...weather} />
                    </div>
                  </div>
                )}

                {/* Pronóstico por hora - ocupa el resto del espacio */}
                {coordinates && (
                  <div className="flex-1 flex">
                    <div className="w-full flex flex-col h-[420px]">
                      <ForecastSection
                        lat={coordinates.lat}
                        lon={coordinates.lon}
                        showHourly={true}
                        showDaily={false}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Pronóstico de 5 días - ancho completo, referencia de alineación */}
              {coordinates && (
                <div className="w-full">
                  <ForecastSection lat={coordinates.lat} lon={coordinates.lon} showHourly={false} showDaily={true} />
                </div>
              )}
            </div>
          )}

          {/* Barra de búsqueda cuando no hay datos - ancho completo */}
          {!weather && !coordinates && (
            <div className="w-full flex justify-center">
              <SearchBar onCitySelect={handleCitySelect} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
