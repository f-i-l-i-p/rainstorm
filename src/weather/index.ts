import { listDaysFromTomorrow, listHoursFromNow } from "../helpers/date";
import { ILocation } from "../location/types";
import { ICombinedWeather, IWeatherDay, IWeatherForecast, IWeatherPoint, IWeatherSpan, WeatherIcon } from "./types";
import AbstractProvider from "./weatherProviders/abstractProvider";
import MET from "./weatherProviders/MET";
import SMHI from "./weatherProviders/SMHI";

const weatherProviders: AbstractProvider[] = [new SMHI(), new MET()]

export interface forecastCallback {
    onSuccess: (forecast: IWeatherForecast) => void,
    onError: (error: string) => void,
}

export function newForecast(location: ILocation, callback: forecastCallback): void {
    const forecast = createEmptyForecast(location);

    let remaining = weatherProviders.length;

    const onSuccess = () => {
        remaining--;

        if (remaining === 0) {
            callback.onSuccess(forecast);
        }
    }

    const onError = (error: Error) => {
        callback.onError(error.message);
    }

    weatherProviders.forEach(provider => {
        provider.fetchForecast(forecast, location, onSuccess, onError);
    });
}

export function createEmptyForecast(location?: ILocation): IWeatherForecast {
    const now = new Date();

    return {
        hours: createEmptyHours(),
        days: createEmptyDays(now),
        providers: listProviderNames(),
        location: location ? location : { country: "", name: "", lat: NaN, long: NaN, alt: NaN },
    };
}

function listProviderNames() {
    return weatherProviders.map((provider) => { return provider.name });
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
    return listDaysFromTomorrow(8).map((date: Date, index: number) => {
        let spans: IWeatherSpan[] = []
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        if (index <= 4) {
            spans = [
                {
                    startDate: new Date(Date.UTC(year, month, day, 0)),
                    endDate: new Date(Date.UTC(year, month, day, 6)),
                    weather: createEmptyCombinedWeather(),
                }, {
                    startDate: new Date(Date.UTC(year, month, day, 6)),
                    endDate: new Date(Date.UTC(year, month, day, 12)),
                    weather: createEmptyCombinedWeather(),
                }, {
                    startDate: new Date(Date.UTC(year, month, day, 12)),
                    endDate: new Date(Date.UTC(year, month, day, 18)),
                    weather: createEmptyCombinedWeather(),
                }, {
                    startDate: new Date(Date.UTC(year, month, day, 18)),
                    endDate: new Date(Date.UTC(year, month, day, 24)),
                    weather: createEmptyCombinedWeather(),
                }
            ]
        }
        else {
            spans = [
                {
                    startDate: new Date(Date.UTC(year, month, day, 0)),
                    endDate: new Date(Date.UTC(year, month, day, 12)),
                    weather: createEmptyCombinedWeather(),
                }, {
                    startDate: new Date(Date.UTC(year, month, day, 12)),
                    endDate: new Date(Date.UTC(year, month, day, 24)),
                    weather: createEmptyCombinedWeather(),
                }
            ]
        }

        return {
            spans: spans,
        }
    });
}

function createEmptyCombinedWeather(): ICombinedWeather {
    let combined: ICombinedWeather = {};

    listProviderNames().forEach(name => {
        combined[name] = {
            temperature: NaN,
            temperatureMax: NaN,
            temperatureMin: NaN,
            wind: NaN,
            gust: NaN,
            precipitation: NaN,
            precipitationUnit: "",
            symbol: WeatherIcon.unknown,
        }
    });

    return combined;
}
