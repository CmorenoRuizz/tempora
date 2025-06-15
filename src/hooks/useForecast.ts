import { useState, useCallback } from "react";
import { fetchForecastByCoords } from "@/lib/fetchWeather";
import type { ForecastData, DailyForecast, HourlyForecast, ForecastItem } from "@/types";

export function useForecast() {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const processForecastData = useCallback((data: ForecastData) => {    // Agrupar por día
    const dailyData: { [key: string]: ForecastItem[] } = {};
    const today = new Date().toDateString();
    const todayHourly: HourlyForecast[] = [];

    data.list.forEach(item => {
      const date = new Date(item.dt_txt);
      const dateKey = date.toDateString();

      // Pronóstico por hora para hoy
      if (dateKey === today) {
        todayHourly.push({
          time: formatTime(item.dt_txt),
          icon: item.weather[0].icon,
          temp: Math.round(item.main.temp),
          feelsLike: Math.round(item.main.feels_like)
        });
      }

      // Agrupar por día
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = [];
      }
      dailyData[dateKey].push(item);
    });

    // Procesar datos diarios
    const daily: DailyForecast[] = Object.keys(dailyData).slice(0, 5).map(dateKey => {
      const dayData = dailyData[dateKey];
      const temps = dayData.map(item => item.main.temp);
      const tempMax = Math.max(...temps);
      const tempMin = Math.min(...temps);
      
      // Buscar el pronóstico del mediodía o el más cercano
      const noonForecast = dayData.find(item => {
        const hour = new Date(item.dt_txt).getHours();
        return hour >= 12 && hour <= 15;
      }) || dayData[Math.floor(dayData.length / 2)];

      return {
        date: dateKey,
        dayName: getDayName(dayData[0].dt_txt),
        icon: noonForecast.weather[0].icon,
        tempMax: Math.round(tempMax),
        tempMin: Math.round(tempMin),
        description: noonForecast.weather[0].description
      };
    });

    setDailyForecast(daily);
    setHourlyForecast(todayHourly);
  }, []);

  const fetchForecast = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchForecastByCoords(lat, lon);
      setForecast(data);
      processForecastData(data);
    } catch (err) {
      setError("Error al obtener el pronóstico");
      console.error("Error fetching forecast:", err);
    } finally {
      setLoading(false);
    }
  }, [processForecastData]);

  return {
    forecast,
    dailyForecast,
    hourlyForecast,
    loading,
    error,
    fetchForecast
  };
}
