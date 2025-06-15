"use client";

import WeatherCard from "@/components/WeatherCard";
import LoadingState from "@/components/LoadingState";
import SearchBar from "@/components/SearchBar";
import { useWeather } from "@/hooks/useWeather";

export default function Home() {
  const { weather, loading, error, setLocation } = useWeather();

  const handleCitySelect = ({ lat, lon }: { lat: number; lon: number; name: string }) => {
    setLocation(lat, lon);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white space-y-6 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Clima Tempora</h1>
        <p className="text-blue-200">Busca el clima de cualquier ciudad</p>
      </div>
      
      <SearchBar onCitySelect={handleCitySelect} />
      
      <LoadingState loading={loading} error={error} />
      
      {weather && <WeatherCard {...weather} />}
    </main>
  );
}
