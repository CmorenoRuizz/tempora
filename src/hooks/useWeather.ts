import { useEffect, useState, useCallback } from "react";
import { fetchWeatherByCoords } from "@/lib/fetchWeather";

type WeatherData = {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  iconCode: string;
};

export function useWeather() {  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);
  const fetchAndSetWeather = useCallback((lat: number, lon: number, isInitialFetch = false) => {
    setLoading(true);
    setError(null);
    
    fetchWeatherByCoords(lat, lon)
      .then((data) => {
        setWeather({
          city: data.name,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
          iconCode: data.weather[0].icon,
        });
        
        if (isInitialFetch) {
          setInitialFetchCompleted(true);
        }
      })
      .catch(() => setError("Error al obtener el clima"))
      .finally(() => setLoading(false));
  }, []);

  const refreshWeather = useCallback(() => {
    if (coordinates) {
      fetchAndSetWeather(coordinates.lat, coordinates.lon);
    }
  }, [coordinates, fetchAndSetWeather]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoordinates({ lat: latitude, lon: longitude });
        fetchAndSetWeather(latitude, longitude, true); // Marcamos como fetch inicial
      },
      () => {
        setError("Permiso de ubicación denegado");
        setLoading(false);
      }
    );
  }, [fetchAndSetWeather]);
  return { weather, error, loading, refreshWeather, initialFetchCompleted };
}
