"use client"

import React from "react"
import WeatherCard from "@/components/WeatherCard"
// import LoadingState from "@/components/LoadingState"
import SearchBar from "@/components/SearchBar"
import Background from "@/components/Background"
import { ForecastSection } from "@/components/ForecastSection"
import { useWeather } from "@/hooks/useWeather"
import { useCityBackground } from "@/hooks/useCityBackground"
import { useBackgroundTransition } from "@/hooks/useBackgroundTransition"

export default function Home() {
  // const { weather, loading, error, setLocation, coordinates } = useWeather()
  const { weather, setLocation, coordinates } = useWeather()
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
    <div className="relative h-screen w-full text-white overflow-hidden flex flex-col">
      <Background
        currentImageUrl={currentImageUrl}
        nextImageUrl={nextImageUrl}
        isTransitioning={isTransitioning}
        imageKey={imageKey}
        onTransitionEnd={handleTransitionEnd}
      />

      <main className="relative z-20 flex-1 w-full flex flex-col items-center justify-center p-2 lg:p-4 overflow-hidden">
        {/* Contenedor principal único con glassmorphism - max-w-7xl */}
        <div className="max-w-7xl w-full h-full max-h-full mx-auto p-4 lg:p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 flex flex-col overflow-y-auto lg:overflow-hidden scrollbar-hide">
          {/* Grid Layout con filas proporcionales para comprimirse */}
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-[auto,auto,3fr,2fr] gap-4 h-auto lg:flex-1 lg:min-h-0">
            {/* Título - ocupando toda la fila superior */}
            <div className="col-span-1 lg:col-span-5 text-center py-2 lg:py-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r bg-white bg-clip-text text-transparent">
                Tempora
              </h1>
            </div>

            {/* Barra de búsqueda - centrada ocupando col-span-5 */}
            <div className="col-span-1 lg:col-span-5 flex justify-center items-center pb-2">
              <SearchBar onCitySelect={handleCitySelect} />
            </div>

            {/* Contenido principal cuando hay datos - fila principal con altura controlada */}
            {(weather || coordinates) && (
              <>
                {/* WeatherCard - col-span-2 con altura dinámica */}
                {weather && (
                  <div className="col-span-1 lg:col-span-2 h-auto lg:h-full lg:min-h-0">
                    <WeatherCard {...weather} />
                  </div>
                )}

                {/* HourlyForecast - col-span-3 con altura dinámica */}
                {coordinates && (
                  <div className="col-span-1 lg:col-span-3 h-auto lg:h-full lg:min-h-0 min-w-0">
                    <ForecastSection
                      lat={coordinates.lat}
                      lon={coordinates.lon}
                      showHourly={true}
                      showDaily={false}
                    />
                  </div>
                )}

                {/* Pronóstico de 5 días - col-span-5 con altura dinámica */}
                {coordinates && (
                  <div className="col-span-1 lg:col-span-5 h-auto lg:h-full lg:min-h-0 min-w-0">
                    <ForecastSection lat={coordinates.lat} lon={coordinates.lon} showHourly={false} showDaily={true} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
