import { ILocation } from "../location/types";

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
    clear_sky_day = "clear_sky_day",
    clear_sky_night = "clear_sky_night",
    nearly_clear_sky_day = "nearly_clear_sky_day",
    nearly_clear_sky_night = "nearly_clear_sky_night",
    half_clear_sky_day = "half_clear_sky_day",
    half_clear_sky_night = "half_clear_sky_night",
    cloudy_sky = "cloudy_sky",
    // Rain
    light_rain = "light_rain",
    moderate_rain = "moderate_rain",
    heavy_rain = "heavy_rain",
    snow = "snow",
    // Other
    thunder = "thunder",
    fog = "fog",
}