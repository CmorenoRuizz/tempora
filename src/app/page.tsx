"use client";

import WeatherCard from "@/components/WeatherCard";
import { useWeather } from "@/hooks/useWeather";
import { useCountdown } from "@/hooks/useCountdown";

export default function Home() {
  const { weather, loading, error, nextUpdate } = useWeather();
  const countdown = useCountdown(nextUpdate);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white space-y-4">
      {loading && <p className="text-xl">Cargando clima por ubicación...</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}
      {weather && (
        <>
          <WeatherCard {...weather} />
          <p className="text-lg text-white font-mono mt-4">{countdown}</p>
        </>
      )}
    </main>
  );
}
