import type { WeatherData } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';

interface Props {
  data: WeatherData;
}

export function CurrentWeather({ data }: Props) {
  const { cityName, country, current } = data;
  const { description, emoji } = getWeatherInfo(current.weather_code);

  return (
    <section className="current-weather" aria-label="Clima actual">
      <div className="city-info">
        <h2 className="city-name">{cityName}</h2>
        <span className="city-country">{country}</span>
      </div>

      <div className="weather-main">
        <span className="weather-emoji" role="img" aria-label={description}>
          {emoji}
        </span>
        <div className="temperature-block">
          <span className="temperature">{Math.round(current.temperature_2m)}°C</span>
          <span className="weather-description">{description}</span>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon" aria-hidden="true">💨</span>
          <span className="detail-label">Viento</span>
          <span className="detail-value">{current.wind_speed_10m} km/h</span>
        </div>
      </div>
    </section>
  );
}
