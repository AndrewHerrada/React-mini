import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useWeather } from './useWeather';

const mockGeoResponse = {
  results: [{ id: 1, name: 'Madrid', latitude: 40.4165, longitude: -3.7026, country: 'Spain' }],
};

const mockWeatherResponse = {
  current: { temperature_2m: 18, wind_speed_10m: 12, weather_code: 0 },
  daily: {
    time: ['2026-02-25', '2026-02-26', '2026-02-27', '2026-02-28', '2026-03-01', '2026-03-02', '2026-03-03'],
    temperature_2m_max: [20, 22, 19, 17, 21, 23, 18],
    temperature_2m_min: [10, 12, 9, 8, 11, 13, 9],
    weather_code: [0, 1, 2, 3, 0, 1, 2],
  },
};

function mockFetch(...responses: object[]) {
  let call = 0;
  return vi.fn().mockImplementation(() => {
    const body = responses[call++] ?? responses[responses.length - 1];
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(body),
    });
  });
}

describe('useWeather', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts in idle state when no city is saved', () => {
    vi.stubGlobal('fetch', mockFetch());
    const { result } = renderHook(() => useWeather());
    expect(result.current.status).toBe('idle');
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('transitions to success state on valid city search', async () => {
    vi.stubGlobal('fetch', mockFetch(mockGeoResponse, mockWeatherResponse));
    const { result } = renderHook(() => useWeather());

    act(() => { result.current.search('Madrid'); });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data?.cityName).toBe('Madrid');
    expect(result.current.data?.current.temperature_2m).toBe(18);
    expect(result.current.data?.daily.time).toHaveLength(7);
  });

  it('transitions to error state when city is not found', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    }));
    const { result } = renderHook(() => useWeather());

    act(() => { result.current.search('xyznonexistent'); });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.error).toContain('xyznonexistent');
    expect(result.current.data).toBeNull();
  });

  it('transitions to error state on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    const { result } = renderHook(() => useWeather());

    act(() => { result.current.search('Madrid'); });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.error).toBe('Network error');
  });

  it('saves the searched city to localStorage on success', async () => {
    vi.stubGlobal('fetch', mockFetch(mockGeoResponse, mockWeatherResponse));
    const { result } = renderHook(() => useWeather());

    act(() => { result.current.search('Madrid'); });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(localStorage.getItem('weather-finder:last-city')).toBe('Madrid');
  });

  it('auto-searches the last saved city on mount', async () => {
    localStorage.setItem('weather-finder:last-city', 'Madrid');
    vi.stubGlobal('fetch', mockFetch(mockGeoResponse, mockWeatherResponse));

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data?.cityName).toBe('Madrid');
  });

  it('exposes savedCity from localStorage', async () => {
    localStorage.setItem('weather-finder:last-city', 'Barcelona');
    vi.stubGlobal('fetch', mockFetch(mockGeoResponse, mockWeatherResponse));
    const { result } = renderHook(() => useWeather());
    expect(result.current.savedCity).toBe('Barcelona');
    // Wait for the auto-search triggered by useEffect to settle
    await waitFor(() => expect(result.current.status).toBe('success'));
  });
});
