import Image from "next/image";
import type { HourlyForecast as HourlyForecastType } from "@/types";

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[];
  loading: boolean;
}

export function HourlyForecast({ hourlyData, loading }: HourlyForecastProps) {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Pronóstico por Hora - Hoy</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 bg-white/5 rounded-lg p-3 text-center min-w-[80px] animate-pulse">
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="w-10 h-10 bg-white/20 rounded-full mx-auto mb-2"></div>
              <div className="h-3 bg-white/20 rounded mb-1"></div>
              <div className="h-3 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hourlyData.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Pronóstico por Hora - Hoy</h3>
        <p className="text-white/70">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Pronóstico por Hora - Hoy</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {hourlyData.map((hour, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 text-center min-w-[80px] border border-white/10"
          >
            <div className="text-white/90 text-sm font-medium mb-2">
              {hour.time}
            </div>            <div className="mb-2">
              <Image
                src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                alt="Weather icon"
                width={40}
                height={40}
                className="mx-auto"
              />
            </div>
            <div className="text-white font-semibold text-sm mb-1">
              {hour.temp}°
            </div>
            <div className="text-white/60 text-xs">
              {hour.feelsLike}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
