import { listDaysFromNow, listHoursFromNow } from "../helpers/date";
import { ILocation } from "../location/types";
import { ICombinedWeather, IWeather, IWeatherForecast, IWeatherPoint, WeatherIcon } from "./types";
import AbstractProvider from "./weatherProviders/abstractProvider";
import MET from "./weatherProviders/MET";
import SMHI from "./weatherProviders/SMHI";

const weatherProviders: AbstractProvider[] = [new SMHI(), new MET()]

export interface forecastCallback {
    onSuccess: (forecast: IWeatherForecast) => void,
}

export function newForecast(location: ILocation, callback: forecastCallback): void {

}

function createEmptyForecast(location: ILocation): IWeatherForecast {
    const now = new Date();

    return {
        hours: createEmptyHours(),
        days: createEmptyDays(now),
        providers: [],
        location: location,
    };
}

function createEmptyHours(): IWeatherPoint[] {
    return listHoursFromNow(24).map((date: Date) => {
        return {
            date: date,
            weather: createEmptyCombinedWeather(),
        }
    });
}

function createEmptyDays(start: Date): IWeatherDay[] {
    return listDaysFromNow(4).map((date: Date) => {

    });
}

function createEmptyCombinedWeather(): ICombinedWeather {
    return {}
}
