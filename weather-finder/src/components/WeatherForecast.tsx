import type { DailyForecastData } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';

interface Props {
  daily: DailyForecastData;
}

function formatDay(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function WeatherForecast({ daily }: Props) {
  return (
    <section className="forecast" aria-label="Pronóstico de 7 días">
      <h3 className="forecast-title">Pronóstico de 7 días</h3>
      <div className="forecast-list">
        {daily.time.map((date, i) => {
          const { description, emoji } = getWeatherInfo(daily.weather_code[i]);
          const isToday = i === 0;
          return (
            <div
              key={date}
              className={`forecast-card${isToday ? ' forecast-card--today' : ''}`}
              aria-label={`${isToday ? 'Hoy' : formatDay(date)}: ${description}, máx ${Math.round(daily.temperature_2m_max[i])}°, mín ${Math.round(daily.temperature_2m_min[i])}°`}
            >
              <span className="forecast-day">{isToday ? 'Hoy' : formatDay(date)}</span>
              <span className="forecast-emoji" role="img" aria-hidden="true">
                {emoji}
              </span>
              <span className="forecast-desc">{description}</span>
              <div className="forecast-temps">
                <span className="temp-max">{Math.round(daily.temperature_2m_max[i])}°</span>
                <span className="temp-separator">/</span>
                <span className="temp-min">{Math.round(daily.temperature_2m_min[i])}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
