import { useEffect, useState } from "react";

export function useCountdown(targetDate: Date | null) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Actualizando...");
        return;
      }      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setCountdown(`Siguiente actualización en ${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
