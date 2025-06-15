"use client";

import WeatherCard from "@/components/WeatherCard";
import LoadingState from "@/components/LoadingState";
import WeatherControls from "@/components/WeatherControls";
import { useWeatherWithCooldown } from "@/hooks/useWeatherWithCooldown";

export default function Home() {
  const {
    weather,
    loading,
    error,
    isCooldownActive,
    timeRemaining,
    lastUpdated,
    handleRefresh,
  } = useWeatherWithCooldown();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white space-y-4">
      <LoadingState loading={loading} error={error} />
      
      {weather && (
        <>
          <WeatherCard {...weather} />
          <WeatherControls
            isCooldownActive={isCooldownActive}
            timeRemaining={timeRemaining}
            lastUpdated={lastUpdated}
            onRefresh={handleRefresh}
          />
        </>
      )}
    </main>
  );
}
