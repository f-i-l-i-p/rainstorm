import { ILocation } from "../store/types";

export interface IForecast {
    weatherPoints: IWeatherTime[],
}

export interface IWeatherTime {
    time: Date,
    weather: IWeather,
}

export interface IWeather {
    temperature: number,
    wind: number,
    gust: number,
    precipitation: number,
    symbol: WeatherIcon,
}

export interface IWeatherProvider {
    name: string;
    logo: string;
    fetchForecast(location: ILocation, onSuccess: (result: IForecast) => any, onFailure: (error: Error) => any): void;
}

export enum WeatherIcon {
    unknown = "unknown",
    // Cloudiness
    clear_sky = "clear_sky",
    nearly_clear_sky = "nearly_clear_sky",
    half_clear_sky = "half_clear_sky",
    cloudy_sky = "cloudy_sky",
    overcast = "overcast",
    // Rain
    light_rain = "light_rain",
    moderate_rain = "moderate_rain",
    heavy_rain = "heavy_rain",
}