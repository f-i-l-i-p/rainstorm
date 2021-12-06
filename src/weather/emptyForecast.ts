import { listDaysFromTomorrow, listHoursFromNow } from "../helpers/date";
import { ILocation } from "../location/types";
import { getProviderNames } from "./forecastMaker";
import { ICombinedWeather, IWeatherDay, IWeatherForecast, IWeatherPoint, IWeatherSpan, WeatherIcon } from "./types";

export function createEmptyForecast(location?: ILocation): IWeatherForecast {
    const now = new Date();

    return {
        hours: createEmptyHours(),
        days: createEmptyDays(now),
        providers: getProviderNames(),
        location: location ? location : { country: "", name: "", lat: NaN, long: NaN, alt: NaN },
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

    getProviderNames().forEach(name => {
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
