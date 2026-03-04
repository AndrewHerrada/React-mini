export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeatherData {
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface DailyForecastData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

export interface WeatherData {
  cityName: string;
  country: string;
  current: CurrentWeatherData;
  daily: DailyForecastData;
}

export type Status = "idle" | "loading" | "success" | "error";
