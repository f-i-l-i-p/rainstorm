import { ILocation } from "../store/types";
import { IForecast, IWeatherProvider } from "./types";

export function fetchWeather(location: ILocation): Promise<IForecast>[] {
    let providers = getWeatherProviders();
    let result: Promise<IForecast>[] = []

    providers.forEach(provider => {
        result.push(provider.fetchForecast(location))
    });

    return result;
}

export function getWeatherProviders(): IWeatherProvider[] {
    return []
}
