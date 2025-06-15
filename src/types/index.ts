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

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface DailyForecast {
  date: string;
  dayName: string;
  icon: string;
  tempMax: number;
  tempMin: number;
  description: string;
}

export interface HourlyForecast {
  time: string;
  icon: string;
  temp: number;
  feelsLike: number;
}
