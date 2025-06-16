import Image from "next/image"
import type { HourlyForecast as HourlyForecastType } from "@/types"

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[]
  loading: boolean
}

export function HourlyForecast({ hourlyData, loading }: HourlyForecastProps) {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 h-full flex flex-col min-w-0">
        <h3 className="text-lg font-semibold text-white mb-4">Pronóstico por Hora - Hoy</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 flex-1 items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-4 text-center animate-pulse h-[160px]">
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2"></div>
              <div className="h-3 bg-white/20 rounded mb-1"></div>
              <div className="h-3 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (hourlyData.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 h-full flex flex-col justify-center min-w-0">
        <h3 className="text-lg font-semibold text-white mb-4">Pronóstico por Hora - Hoy</h3>
        <p className="text-white/70">No hay datos disponibles</p>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 h-full flex flex-col min-w-0">
      <h3 className="text-lg font-semibold text-white mb-4">Pronóstico por Hora - Hoy</h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 flex-1 items-center">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-4 text-center h-[160px] border border-white/10 flex flex-col justify-between"
          >
            <div className="text-white/90 text-sm font-medium">{hour.time}</div>
            <Image
              src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
              alt="Weather icon"
              width={50}
              height={50}
              className="mx-auto"
            />
            <div className="text-white font-semibold text-base">{hour.temp}°</div>
            <div className="text-white/60 text-sm">{hour.feelsLike}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}
