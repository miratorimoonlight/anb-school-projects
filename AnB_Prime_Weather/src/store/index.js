import { create } from "zustand";

import {
  fetchCurrentWeather,
  fetchForecastWeather,
  fetchLocationViaIP,
} from "../api/weatherAPI";
import { getDay } from "../utils/utils";

const weatherStore = (set, get) => ({
  chosenLoc: null,
  mainWeather: null,
  error: null,
  isLoading: false,

  /**
   * Fetch weather data (current time and 4 days forecast)
   * @param {float} lat
   * @param {float} lon
   * @param {boolean} hasGeoLoc (default = true)
   */
  fetchWeather: async (lat, lon, hasGeoLoc = true) => {
    try {
      set({ isLoading: true });

      let res;
      if (hasGeoLoc) {
        res = await fetchCurrentWeather(lat, lon);
        await get()._fetchForecast(lat, lon);
      } else {
        const locRes = await fetchLocationViaIP();
        const locData = locRes.loc.split(",");

        res = await fetchCurrentWeather(locData[0], locData[1]);
        res.name = res.name + " (from IP)";
        await get()._fetchForecast(locData[0], locData[1]);
      }
      set({
        mainWeather: {
          temp: Math.round(res.main.temp),
          feelsLike: Math.round(res.main.feels_like),
          windSpeed: Math.round(res.wind.speed * 3.6),
          icon: res.weather[0].icon,
          description: res.weather[0].description,
          name: res.name,
        },
        error: null,
      });
    } catch (error) {
      set({
        mainWeather: null,
        error,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setChosenLoc: ({ txt, lat, lon }) => {
    set({
      chosenLoc: { txt, lat, lon },
    });
  },

  setLoading: (bool) => set({ isLoading: bool }),

  fourDayWeather: [],

  /**
   * Fetch forecast of 4 days
   * @param {float} lat
   * @param {float} lon
   */
  _fetchForecast: async (lat, lon) => {
    try {
      const res = await fetchForecastWeather(lat, lon);
      const data = [];

      for (let i = 8; i < res.list.length; i += 8) {
        data.push({
          temp: Math.round(res.list[i].main.temp),
          day: getDay(new Date(res.list[i].dt_txt)),
          icon: res.list[i].weather[0].icon,
        });
      }

      set({
        fourDayWeather: data,
        error: null,
      });
    } catch (error) {
      set({
        fourDayWeather: [],
        error,
      });
    }
  },
});

/**
 * 👇This helps with debug the state by using localStorage
 */
// const useWeatherStore = create(
//   devtools(persist(weatherStore, { name: "weatherStore" }))
// );

const useWeatherStore = create(weatherStore);

export default useWeatherStore;
