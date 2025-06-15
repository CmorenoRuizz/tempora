import Image from "next/image";
import type { DailyForecast as DailyForecastType } from "@/types";

interface DailyForecastProps {
  dailyData: DailyForecastType[];
  loading: boolean;
}

export function DailyForecast({ dailyData, loading }: DailyForecastProps) {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Pronóstico de 5 Días</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-4 bg-white/20 rounded"></div>
                <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                <div className="w-24 h-4 bg-white/20 rounded"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-4 bg-white/20 rounded"></div>
                <div className="w-8 h-4 bg-white/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (dailyData.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Pronóstico de 5 Días</h3>
        <p className="text-white/70">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Pronóstico de 5 Días</h3>
      <div className="space-y-3">
        {dailyData.map((day, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0 hover:bg-white/5 rounded-lg px-2 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="text-white/90 font-medium min-w-[80px]">
                {index === 0 ? 'Hoy' : day.dayName}
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  width={48}
                  height={48}
                  className="flex-shrink-0"
                />
                <div className="text-white/80 text-sm capitalize min-w-[100px]">
                  {day.description}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="font-semibold text-lg">
                {day.tempMax}°
              </span>
              <span className="text-white/60">
                {day.tempMin}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
