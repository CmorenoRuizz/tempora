const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchWeatherByCity(city: string) {
  const res = await fetch(
    `${BASE_URL}?q=${city}&units=metric&lang=es&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("No se pudo obtener el clima por ciudad");
  return res.json();
}

export async function fetchWeatherByCoords(lat: number, lon: number) {
  const res = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("No se pudo obtener el clima por coordenadas");
  return res.json();
}

export async function fetchForecastByCoords(lat: number, lon: number) {
  const res = await fetch(
    `${FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("No se pudo obtener el pronóstico");
  return res.json();
}
