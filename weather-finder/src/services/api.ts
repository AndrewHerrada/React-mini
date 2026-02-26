import type { GeocodingResult, CurrentWeatherData, DailyForecastData } from '../types/weather';

const GEO_API_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function geocodeCity(city: string): Promise<GeocodingResult> {
  const url = `${GEO_API_BASE}?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('No se pudo conectar con el servicio de búsqueda.');
  }

  const data = await res.json();

  if (!data.results?.length) {
    throw new Error(`No se encontró ninguna ciudad con el nombre "${city}".`);
  }

  return data.results[0];
}

export async function fetchWeather(
  latitude: number,
  longitude: number,
): Promise<{ current: CurrentWeatherData; daily: DailyForecastData }> {
  // Open-Meteo requires comma-separated field names with literal commas (not %2C).
  // Using a template literal avoids URLSearchParams encoding commas as %2C.
  const url =
    `${WEATHER_API_BASE}` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,weather_code` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&timezone=auto` +
    `&forecast_days=7`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('No se pudo obtener el pronóstico del tiempo.');
  }

  const data = await res.json();

  if (import.meta.env.DEV) {
    console.log('[weather] daily min temps:', data.daily?.temperature_2m_min);
  }

  return { current: data.current, daily: data.daily };
}
