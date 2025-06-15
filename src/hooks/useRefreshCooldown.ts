import { useEffect, useState } from "react";

const COOLDOWN_DURATION = 2 * 60 * 1000; // 2 minutos en milisegundos
const STORAGE_KEY = "weather_last_updated";

export function useRefreshCooldown() {
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    // Leer del localStorage al montar el componente
    const storedTimestamp = localStorage.getItem(STORAGE_KEY);
    if (storedTimestamp) {
      const lastUpdateDate = new Date(parseInt(storedTimestamp));
      setLastUpdated(lastUpdateDate);
      
      const timeSinceLastUpdate = Date.now() - lastUpdateDate.getTime();
      if (timeSinceLastUpdate < COOLDOWN_DURATION) {
        setIsCooldownActive(true);
        
        // Iniciar temporizador para cuando termine el cooldown
        const remainingTime = COOLDOWN_DURATION - timeSinceLastUpdate;
        setTimeout(() => {
          setIsCooldownActive(false);
          setTimeRemaining("");
        }, remainingTime);
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCooldownActive && lastUpdated) {
      // Actualizar el tiempo restante cada segundo
      interval = setInterval(() => {
        const timeSinceLastUpdate = Date.now() - lastUpdated.getTime();
        const remainingTime = COOLDOWN_DURATION - timeSinceLastUpdate;

        if (remainingTime <= 0) {
          setIsCooldownActive(false);
          setTimeRemaining("");
        } else {
          const minutes = Math.floor(remainingTime / 60000);
          const seconds = Math.floor((remainingTime % 60000) / 1000);
          setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCooldownActive, lastUpdated]);

  const triggerUpdate = () => {
    const now = new Date();
    setLastUpdated(now);
    setIsCooldownActive(true);
    
    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEY, now.getTime().toString());
    
    // Configurar timeout para cuando termine el cooldown
    setTimeout(() => {
      setIsCooldownActive(false);
      setTimeRemaining("");
    }, COOLDOWN_DURATION);
  };

  return {
    isCooldownActive,
    lastUpdated,
    timeRemaining,
    triggerUpdate,
  };
}
