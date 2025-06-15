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

const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutos

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const fetchAndSetWeather = useCallback((lat: number, lon: number, isAutoUpdate = false) => {
    if (!isAutoUpdate) {
      setLoading(true);
      console.log("🌍 Obteniendo clima inicial...");
    }
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
        
        if (isAutoUpdate) {
          console.log("⏱️ Clima actualizado automáticamente");
        } else {
          console.log("✅ Clima inicial obtenido correctamente");
        }
      })
      .catch(() => setError("Error al obtener el clima"))
      .finally(() => {
        if (!isAutoUpdate) {
          setLoading(false);
        }
      });
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
        fetchAndSetWeather(latitude, longitude); // Fetch inicial
      },
      () => {
        setError("Permiso de ubicación denegado");
        setLoading(false);
      }
    );
  }, [fetchAndSetWeather]);

  // Efecto para el intervalo automático cada 5 minutos
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (coordinates) {
      intervalId = setInterval(() => {
        fetchAndSetWeather(coordinates.lat, coordinates.lon, true); // Actualización automática
      }, UPDATE_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [coordinates, fetchAndSetWeather]);

  return { weather, error, loading, refreshWeather };
}
