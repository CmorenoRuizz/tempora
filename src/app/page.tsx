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
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      <Background
        currentImageUrl={currentImageUrl}
        nextImageUrl={nextImageUrl}
        isTransitioning={isTransitioning}
        imageKey={imageKey}
        onTransitionEnd={handleTransitionEnd}
      />

      <main className="relative z-20 flex flex-col items-center justify-start min-h-full p-4 pt-8">
        {/* Contenedor principal único con glassmorphism - max-w-7xl */}
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
          {/* Grid Layout con filas automáticas - responsivo */}
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-[auto,auto,auto,1fr,auto] gap-4">
            {/* Título - ocupando toda la fila superior */}
            <div className="col-span-1 lg:col-span-5 text-center py-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r bg-white bg-clip-text text-transparent">
                Tempora
              </h1>
              {/* <p className="text-white/80 text-lg">Busca el clima de cualquier ciudad</p> */}
            </div>

            {/* Loading State */}
            {/* <div className="col-span-5 flex justify-center items-center min-h-[40px]">
              <LoadingState loading={loading} error={error} />
            </div> */}

            {/* Barra de búsqueda - centrada ocupando col-span-5 */}
            <div className="col-span-1 lg:col-span-5 flex justify-center items-center py-2">
              <SearchBar onCitySelect={handleCitySelect} />
            </div>

            {/* Contenido principal cuando hay datos - fila principal con altura controlada */}
            {(weather || coordinates) && (
              <>
                {/* WeatherCard - col-span-2 con altura específica */}
                {weather && (
                  <div className="col-span-1 lg:col-span-2 min-h-[300px] lg:h-[400px]">
                    <WeatherCard {...weather} />
                  </div>
                )}

                {/* HourlyForecast - col-span-3 con altura específica */}
                {coordinates && (
                  <div className="col-span-1 lg:col-span-3 min-h-[300px] lg:h-[400px] min-w-0">
                    <ForecastSection
                      lat={coordinates.lat}
                      lon={coordinates.lon}
                      showHourly={true}
                      showDaily={false}
                    />
                  </div>
                )}

                {/* Pronóstico de 5 días - col-span-5 con altura específica */}
                {coordinates && (
                  <div className="col-span-1 lg:col-span-5 min-h-[250px] lg:h-[300px] min-w-0">
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
