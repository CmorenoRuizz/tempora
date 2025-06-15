import { useEffect, useState } from "react";
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
  const [nextUpdate, setNextUpdate] = useState<Date | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchAndSetWeather = (lat: number, lon: number) => {
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
          setNextUpdate(new Date(Date.now() + UPDATE_INTERVAL));
        })
        .catch(() => setError("Error al obtener el clima"))
        .finally(() => setLoading(false));
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchAndSetWeather(latitude, longitude);
        intervalId = setInterval(() => fetchAndSetWeather(latitude, longitude), UPDATE_INTERVAL);
      },
      () => {
        setError("Permiso de ubicación denegado");
        setLoading(false);
      }
    );

    return () => clearInterval(intervalId);
  }, []);

  return { weather, error, loading, nextUpdate };
}
