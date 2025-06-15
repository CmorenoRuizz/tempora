import { useWeather } from "./useWeather";
import { useRefreshCooldown } from "./useRefreshCooldown";
import { useEffect } from "react";

export function useWeatherWithCooldown() {
  const { weather, loading, error, refreshWeather, initialFetchCompleted } = useWeather();
  const { isCooldownActive, lastUpdated, timeRemaining, triggerUpdate } = useRefreshCooldown();

  // Activar cooldown cuando se complete el fetch inicial
  useEffect(() => {
    if (initialFetchCompleted && !lastUpdated) {
      triggerUpdate();
    }
  }, [initialFetchCompleted, lastUpdated, triggerUpdate]);

  const handleRefresh = () => {
    triggerUpdate();
    refreshWeather();
  };

  return {
    // Estados del clima
    weather,
    loading,
    error,
    
    // Estados del cooldown
    isCooldownActive,
    lastUpdated,
    timeRemaining,
    
    // Función de actualización
    handleRefresh,
  };
}
