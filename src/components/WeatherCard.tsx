type WeatherCardProps = {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  iconCode: string;
};

import Image from "next/image";

export default function WeatherCard({
  city,
  temperature,
  description,
  iconCode,
  feelsLike,
  humidity,
  pressure,
  windSpeed,
}: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 max-w-xs text-center space-y-3 border border-white/20">
      <h2 className="text-2xl font-semibold text-white">{city}</h2>      <Image
        src={iconUrl}
        alt={description}
        width={80}
        height={80}
        className="mx-auto"
        priority
      />

      <p className="text-5xl font-bold text-white">{temperature.toFixed(1)}°C</p>
      <p className="text-white/80 capitalize text-lg">{description}</p>
      
      <div className="space-y-2 pt-4 border-t border-white/20">
        <p className="text-sm text-white/70">
          Sensación térmica: <span className="text-white font-medium">{feelsLike.toFixed(1)}°C</span>
        </p>
        <p className="text-sm text-white/70">
          Humedad: <span className="text-white font-medium">{humidity}%</span>
        </p>
        <p className="text-sm text-white/70">
          Presión: <span className="text-white font-medium">{pressure} hPa</span>
        </p>
        <p className="text-sm text-white/70">
          Viento: <span className="text-white font-medium">{windSpeed} m/s</span>
        </p>
      </div>
    </div>
  );
}
