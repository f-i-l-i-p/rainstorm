import { ILocation } from "../location/types";

export interface IWeatherForecast {
    hours: IWeatherPoint[],
    days: IWeatherDay[],
    providers: string[],
    location: ILocation,
}

export interface IWeatherPoint {
    date: Date,
    weather: ICombinedWeather,
}

export interface IWeatherDay {
    spans: IWeatherSpan[],
}

export interface IWeatherSpan {
    startDate: Date,
    endDate: Date,
    weather: ICombinedWeather
}

export interface ICombinedWeather {
    [key: string]: IWeather,
}

export interface IWeather {
    temperature: number,
    wind: number,
    gust: number,
    precipitation: number,
    symbol: WeatherIcon,
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
    // Other
    thunder = "thunder",
    fog = "fog",
}