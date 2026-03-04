import { CurrentWeather } from "./components/CurrentWeather";
import { ErrorMessage } from "./components/ErrorMessage";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SearchBar } from "./components/SearchBar";
import { WeatherForecast } from "./components/WeatherForecast";
import { useWeather } from "./hooks/useWeather";
import "./App.css";

function App() {
  const { status, data, error, search, savedCity } = useWeather();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span aria-hidden="true">🌤️</span> Weather Finder
        </h1>
        <p className="app-subtitle">Consulta el clima de cualquier ciudad del mundo</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={search} isLoading={status === "loading"} initialValue={savedCity} />

        <div className="app-content">
          {status === "idle" && (
            <div className="idle-state">
              <span className="idle-emoji" aria-hidden="true">
                🌍
              </span>
              <p>Busca una ciudad para ver su pronóstico del tiempo</p>
            </div>
          )}

          {status === "loading" && <LoadingSpinner />}

          {status === "error" && error && <ErrorMessage message={error} />}

          {status === "success" && data && (
            <>
              <CurrentWeather data={data} />
              <WeatherForecast daily={data.daily} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
