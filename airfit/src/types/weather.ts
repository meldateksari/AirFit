// OpenWeatherMap verileri

export interface WeatherCondition {
  description: string;
  main: string;
  icon: string;
}

export interface MainData {
  temp: number;
  humidity: number;
  feels_like: number;
}

export interface WindData {
  speed: number;
}

export interface CurrentWeatherData {
  name: string;
  main: MainData;
  weather: WeatherCondition[];
  wind: WindData;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  main: MainData;
  weather: WeatherCondition[];
  dt_txt: string;
}

export interface WeatherResponse {
  current: CurrentWeatherData;
  forecast: ForecastItem[];
}

export interface AdviceRequestBody {
  weatherData: CurrentWeatherData;
  forecastSample: ForecastItem[];
}
