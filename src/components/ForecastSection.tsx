import { useEffect } from "react";
import { HourlyForecast } from "./HourlyForecast";
import { DailyForecast } from "./DailyForecast";
import { useForecast } from "@/hooks/useForecast";

interface ForecastSectionProps {
  lat?: number;
  lon?: number;
  showHourly?: boolean;
  showDaily?: boolean;
}

export function ForecastSection({ lat, lon, showHourly = true, showDaily = true }: ForecastSectionProps) {
  const { dailyForecast, hourlyForecast, loading, error, fetchForecast } = useForecast();

  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      fetchForecast(lat, lon);
    }
  }, [lat, lon, fetchForecast]);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
          <p className="text-white text-center">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`${showHourly && showDaily ? 'space-y-6' : ''} h-full`}>
      {showHourly && <HourlyForecast hourlyData={hourlyForecast} loading={loading} />}
      {showDaily && <DailyForecast dailyData={dailyForecast} loading={loading} />}
    </div>
  );
}
