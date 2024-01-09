import { useEffect } from "react";
import "./App.css";
import MainTemp from "./components/MainTemp";
import Search from "./components/Search";
import DayTemp from "./components/DayTemp";
import ErrorUI from "./components/ErrorUI";
import useWeatherStore from "./store";
import MainLoadingSpinner from "./components/MainLoadingSpinner";

function App() {
  const { isLoading, fetchWeather, setLoading, fourDayWeather, error } =
    useWeatherStore();

  /**
   * Get current location
   * IF can get via geolocation, ok.
   * Else get via IP address.
   */
  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude);
        },
        function () {
          fetchWeather(null, null, false);
        }
      );
    } else fetchWeather(null, null, false);
  }, []);

  return (
    <>
      <div className="container">
        <section id="main">
          <Search />

          {isLoading ? (
            <MainLoadingSpinner />
          ) : error ? (
            <ErrorUI />
          ) : (
            <MainTemp />
          )}
        </section>
        {fourDayWeather.length > 0 && !error && (
          <section id="days">
            {fourDayWeather.map((each, idx) => (
              <DayTemp
                key={idx}
                day={each.day}
                icon={each.icon}
                temp={each.temp}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}

export default App;
