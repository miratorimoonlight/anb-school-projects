import axios from "axios";

/**
 * API error handler
 * @param {ErrorObj} err
 */
const errorHandler = (err) => {
  let error = {
    msg: "Something went wrong. Please try again.",
  };

  if (err?.response) {
    error = {
      code: err.response.status,
      msg: err.response.data.message,
    };
  } else {
    error.code = 1;
  }

  return Promise.reject(error);
};

/**
 * TODO: appid should be in .env (in production)
 */
export const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  timeout: 7000,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    appid: "aa1b4172fa81a76422b94481a99e1127",
    units: "metric",
  },
});

weatherClient.interceptors.response.use((res) => res.data, errorHandler);

/******************************************************************************/

export const ipLocationClient = axios.create({
  baseURL: "https://ipinfo.io/",
  params: {
    token: "32e5ab57dc8c10",
  },
});

ipLocationClient.interceptors.response.use((res) => res.data, errorHandler);

/******************************************************************************/

export const searchLocClient = axios.create({
  baseURL: "https://nominatim.openstreetmap.org/",
  params: {
    format: "jsonv2",
  },
});

searchLocClient.interceptors.response.use((res) => res.data, errorHandler);
