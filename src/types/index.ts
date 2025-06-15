export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  iconCode: string;
}

export interface CityData {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface CitySelection {
  lat: number;
  lon: number;
  name: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}
