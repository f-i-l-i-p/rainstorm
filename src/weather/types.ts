import { ILocation } from "../store/types";

export interface IForecast {
    weatherPoints: Map<Date, IWeather>
}

export interface IWeather {
    temperature: number,
    wind: number,
    gust: number,
    symbol: string,
}

export interface IWeatherProvider {
    name: string;
    logo: string;
    fetchForecast(location: ILocation): Promise<IForecast>;
}