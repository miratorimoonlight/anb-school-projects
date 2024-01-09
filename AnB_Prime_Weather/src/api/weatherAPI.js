import { weatherClient, ipLocationClient } from "./setup";

/**
 * fetch weather for current time
 * @param {float} lat
 * @param {float} lon
 */
export const fetchCurrentWeather = async (lat, lon) => {
  const res = await weatherClient.get("/weather", {
    method: "get",
    params: {
      lat,
      lon,
    },
  });

  return res;
};

/**
 * fetch forecast of 5 days
 * @param {float} lat
 * @param {float} lon
 */
export const fetchForecastWeather = async (lat, lon) => {
  const res = await weatherClient.get("/forecast", {
    method: "get",
    params: {
      lat,
      lon,
    },
  });

  return res;
};

/**
 * fetch lat and lon based on IP
 */
export const fetchLocationViaIP = async () => {
  const res = await ipLocationClient.get("/json");
  return res;
};
