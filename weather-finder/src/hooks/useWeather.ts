import { useState, useCallback, useEffect } from 'react';
import { geocodeCity, fetchWeather } from '../services/api';
import type { WeatherData, Status } from '../types/weather';

const LAST_CITY_KEY = 'weather-finder:last-city';

interface WeatherState {
  status: Status;
  data: WeatherData | null;
  error: string | null;
}

export function useWeather() {
  const [savedCity] = useState<string>(() => localStorage.getItem(LAST_CITY_KEY) ?? '');

  const [state, setState] = useState<WeatherState>({
    status: 'idle',
    data: null,
    error: null,
  });

  const search = useCallback(async (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setState({ status: 'loading', data: null, error: null });

    try {
      const { name, latitude, longitude, country } = await geocodeCity(trimmed);
      const { current, daily } = await fetchWeather(latitude, longitude);

      localStorage.setItem(LAST_CITY_KEY, trimmed);

      setState({
        status: 'success',
        data: { cityName: name, country, current, daily },
        error: null,
      });
    } catch (err) {
      setState({
        status: 'error',
        data: null,
        error: err instanceof Error ? err.message : 'Ocurrió un error inesperado.',
      });
    }
  }, []);

  // Auto-search the last city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem(LAST_CITY_KEY);
    if (lastCity) search(lastCity);
  }, [search]);

  return { ...state, search, savedCity };
}
