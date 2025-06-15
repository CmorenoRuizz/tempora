"use client";

import WeatherCard from "@/components/WeatherCard";
import LoadingState from "@/components/LoadingState";
import { useWeather } from "@/hooks/useWeather";

export default function Home() {
  const { weather, loading, error } = useWeather();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white space-y-4">
      <LoadingState loading={loading} error={error} />
      
      {weather && <WeatherCard {...weather} />}
    </main>
  );
}
