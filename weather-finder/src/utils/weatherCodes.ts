interface WeatherInfo {
  description: string;
  emoji: string;
}

const WEATHER_CODES: Record<number, WeatherInfo> = {
  0:  { description: 'Cielo despejado',            emoji: '☀️'  },
  1:  { description: 'Principalmente despejado',   emoji: '🌤️' },
  2:  { description: 'Parcialmente nublado',        emoji: '⛅'  },
  3:  { description: 'Nublado',                     emoji: '☁️'  },
  45: { description: 'Niebla',                      emoji: '🌫️' },
  48: { description: 'Niebla con escarcha',         emoji: '🌫️' },
  51: { description: 'Llovizna ligera',             emoji: '🌦️' },
  53: { description: 'Llovizna moderada',           emoji: '🌦️' },
  55: { description: 'Llovizna intensa',            emoji: '🌦️' },
  56: { description: 'Llovizna helada ligera',      emoji: '🌨️' },
  57: { description: 'Llovizna helada intensa',     emoji: '🌨️' },
  61: { description: 'Lluvia ligera',               emoji: '🌧️' },
  63: { description: 'Lluvia moderada',             emoji: '🌧️' },
  65: { description: 'Lluvia intensa',              emoji: '🌧️' },
  66: { description: 'Lluvia helada ligera',        emoji: '🌨️' },
  67: { description: 'Lluvia helada intensa',       emoji: '🌨️' },
  71: { description: 'Nevada ligera',               emoji: '🌨️' },
  73: { description: 'Nevada moderada',             emoji: '❄️'  },
  75: { description: 'Nevada intensa',              emoji: '❄️'  },
  77: { description: 'Granizo',                     emoji: '🌨️' },
  80: { description: 'Chubascos ligeros',           emoji: '🌦️' },
  81: { description: 'Chubascos moderados',         emoji: '🌧️' },
  82: { description: 'Chubascos intensos',          emoji: '⛈️' },
  85: { description: 'Nevadas ligeras',             emoji: '🌨️' },
  86: { description: 'Nevadas intensas',            emoji: '❄️'  },
  95: { description: 'Tormenta eléctrica',          emoji: '⛈️' },
  96: { description: 'Tormenta con granizo',        emoji: '⛈️' },
  99: { description: 'Tormenta con granizo intenso',emoji: '⛈️' },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER_CODES[code] ?? { description: 'Desconocido', emoji: '🌡️' };
}
