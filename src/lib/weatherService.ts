import axios from "axios";
import {
  WeatherResponse,
  CurrentWeatherData,
  ForecastItem,
} from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = async (
  city: string
): Promise<WeatherResponse> => {
  const current = await axios.get<CurrentWeatherData>(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "tr",
    },
  });

  const forecast = await axios.get<{ list: ForecastItem[] }>(
    `${BASE_URL}/forecast`,
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "tr",
      },
    }
  );

  return {
    current: current.data,
    forecast: forecast.data.list,
  };
};
export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  const current = await axios.get<CurrentWeatherData>(`${BASE_URL}/weather`, {
    params: { lat, lon, appid: API_KEY, units: "metric", lang: "tr" },
  });

  const forecast = await axios.get<{ list: ForecastItem[] }>(
    `${BASE_URL}/forecast`,
    {
      params: { lat, lon, appid: API_KEY, units: "metric", lang: "tr" },
    }
  );

  return {
    current: current.data,
    forecast: forecast.data.list,
  };
};
