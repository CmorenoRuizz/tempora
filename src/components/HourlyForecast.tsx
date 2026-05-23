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
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Pronóstico por Hora - Hoy</h3>        <div className="flex lg:grid lg:grid-cols-6 overflow-x-auto lg:overflow-visible scrollbar-hide gap-3 lg:gap-4 w-full pb-2 lg:pb-0">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-3 lg:p-4 text-center animate-pulse h-auto min-h-[120px] border border-white/10 flex flex-col justify-center space-y-2 min-w-[90px] lg:min-w-0 flex-1 flex-shrink-0">
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
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Pronóstico por Hora - Hoy</h3>
        <p className="text-white/70">No hay datos disponibles</p>
      </div>
    )
  }
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 h-full flex flex-col min-w-0">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">Pronóstico por Hora - Hoy</h3>
      {/* Contenedor unificado responsivo */}
      <div className="flex lg:grid lg:grid-cols-6 overflow-x-auto lg:overflow-visible scrollbar-hide gap-3 lg:gap-4 w-full pb-2 lg:pb-0">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-2 lg:p-3 text-center h-auto min-h-[120px] border border-white/10 flex flex-col justify-center space-y-2 min-w-[90px] lg:min-w-0 flex-1 flex-shrink-0"
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
