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
    <div className="bg-black rounded-xl shadow-md p-6 max-w-xs text-center space-y-2">
      <h2 className="text-2xl font-semibold">{city}</h2>
      <Image
        src={iconUrl}
        alt={description}
        width={80}
        height={80}
        className="mx-auto"
      />

      <p className="text-4xl font-bold">{temperature.toFixed(1)}°C</p>
      <p className="text-gray-600 capitalize">{description}</p>
      <p className="text-sm text-gray-400">
        Sensación térmica: {feelsLike.toFixed(1)}°C
      </p>
      <p className="text-sm text-gray-400">Humedad: {humidity}%</p>
      <p className="text-sm text-gray-400">Presión: {pressure} hPa</p>
      <p className="text-sm text-gray-400">Viento: {windSpeed} m/s</p>
    </div>
  );
}
