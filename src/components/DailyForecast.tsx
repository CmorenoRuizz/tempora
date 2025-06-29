import Image from "next/image";
import type { DailyForecast as DailyForecastType } from "@/types";

interface DailyForecastProps {
  dailyData: DailyForecastType[];
  loading: boolean;
}

export function DailyForecast({ dailyData, loading }: DailyForecastProps) {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 h-full flex flex-col min-w-0">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Pronóstico de 5 Días</h3>        <div className="hidden lg:grid lg:gap-4 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-4 text-center animate-pulse border border-white/10">
              <div className="h-4 bg-white/20 rounded mb-3"></div>
              <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3"></div>
              <div className="h-3 bg-white/20 rounded mb-3"></div>
              <div className="flex justify-center gap-2">
                <div className="h-4 w-8 bg-white/20 rounded"></div>
                <div className="h-3 w-6 bg-white/20 rounded"></div>
              </div>
            </div>
          ))}        </div>
        {/* Vista móvil con scroll horizontal */}
        <div className="flex lg:hidden overflow-x-auto scrollbar-glass gap-4 w-full pb-2">
          <div className="flex gap-4 min-w-max">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-4 text-center animate-pulse border border-white/10 min-w-[120px] flex-shrink-0">
                <div className="h-4 bg-white/20 rounded mb-3"></div>
                <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3"></div>
                <div className="h-3 bg-white/20 rounded mb-3"></div>
                <div className="flex justify-center gap-2">
                  <div className="h-4 w-8 bg-white/20 rounded"></div>
                  <div className="h-3 w-6 bg-white/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (dailyData.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 h-full flex flex-col justify-center min-w-0">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Pronóstico de 5 Días</h3>
        <p className="text-white/70">No hay datos disponibles</p>
      </div>
    );
  }
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 h-full flex flex-col min-w-0">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">Pronóstico de 5 Días</h3>
      {/* Vista escritorio con grid */}
      <div className="hidden lg:grid lg:gap-4 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] w-full">
        {dailyData.map((day, index) => (
          <div
            key={index}
            className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-4 text-center border border-white/10"
          >
            <div className="text-white/90 text-sm font-medium mb-3">
              {index === 0 ? 'Hoy' : day.dayName}
            </div>
            <div className="mb-3">
              <Image
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                width={48}
                height={48}
                className="mx-auto"
              />
            </div>
            <div className="text-white/80 text-xs capitalize mb-3 min-h-[32px] flex items-center justify-center">
              {day.description}
            </div>
            <div className="flex justify-center items-center gap-2">
              <span className="text-white font-semibold text-lg">
                {day.tempMax}°
              </span>
              <span className="text-white/60 text-sm">
                {day.tempMin}°
              </span>
            </div>
          </div>
        ))}      </div>
      {/* Vista móvil con scroll horizontal */}
      <div className="flex lg:hidden overflow-x-auto scrollbar-glass gap-4 w-full pb-2">
        <div className="flex gap-4 min-w-max">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-4 text-center border border-white/10 min-w-[120px] flex-shrink-0"
            >
              <div className="text-white/90 text-sm font-medium mb-3">
                {index === 0 ? 'Hoy' : day.dayName}
              </div>
              <div className="mb-3">
                <Image
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  width={48}
                  height={48}
                  className="mx-auto"
                />
              </div>
              <div className="text-white/80 text-xs capitalize mb-3 min-h-[32px] flex items-center justify-center">
                {day.description}
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-white font-semibold text-lg">
                  {day.tempMax}°
                </span>
                <span className="text-white/60 text-sm">
                  {day.tempMin}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
