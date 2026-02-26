import { useState } from 'react';
import { geocodeCity, fetchWeather } from '../services/api';
import type { WeatherData, Status } from '../types/weather';

interface WeatherState {
  status: Status;
  data: WeatherData | null;
  error: string | null;
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    status: 'idle',
    data: null,
    error: null,
  });

  async function search(city: string) {
    const trimmed = city.trim();
    if (!trimmed) return;

    setState({ status: 'loading', data: null, error: null });

    try {
      const { name, latitude, longitude, country } = await geocodeCity(trimmed);
      const { current, daily } = await fetchWeather(latitude, longitude);

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
  }

  return { ...state, search };
}
