import { IWeather, IWeatherForecast, WeatherIcon } from "../types";
import AbstractProvider from "./abstractProvider";


export default class SMHI extends AbstractProvider {
    constructor() {
        super("SMHI")
    }

    // Weather parameter descriptions can be found at:
    // https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-table
    private icons = {
        1: WeatherIcon.clear_sky_day,        // Clear sky
        2: WeatherIcon.nearly_clear_sky_day, // Nearly clear sky
        3: WeatherIcon.half_clear_sky_day,   // Variable cloudiness
        4: WeatherIcon.half_clear_sky_day,   // Half clear sky
        5: WeatherIcon.cloudy,           // Cloudy sky
        6: WeatherIcon.cloudy,           // Overcast
        7: WeatherIcon.fog,                  // Fo7
        8: WeatherIcon.light_rain,           // Light rain showers
        9: WeatherIcon.moderate_rain,        // Moderate rain showers
        10: WeatherIcon.heavy_rain,          // Heavy rain showers
        11: WeatherIcon.thunder,             // Thunderstorm
        18: WeatherIcon.light_rain,          // Light rain
        19: WeatherIcon.moderate_rain,       // Moderate rain
        20: WeatherIcon.heavy_rain,          // Heavy rain
        21: WeatherIcon.thunder,             // Thunder
        22: WeatherIcon.light_sleet,         // Light sleet
        23: WeatherIcon.moderate_sleet,      // Moderate sleet
        24: WeatherIcon.heavy_sleet,         // Heavy sleet
        25: WeatherIcon.snow,                // Light snowfall
        26: WeatherIcon.snow,                // Moderate snowfall
        27: WeatherIcon.snow,                // Heavy snowfall
    }

    private getIcon(value: never, date: Date): WeatherIcon {
        let icon = this.icons[value];
        if (!icon) {
            console.warn("Unknown symbol value", value)
            return WeatherIcon.unknown;
        }

        const hours = date.getHours();
        if (hours > 15 || hours < 8) {
            switch (icon) {
                case WeatherIcon.clear_sky_day:
                    return WeatherIcon.clear_sky_night;
                case WeatherIcon.half_clear_sky_day:
                    return WeatherIcon.half_clear_sky_night;
                case WeatherIcon.nearly_clear_sky_day:
                    return WeatherIcon.nearly_clear_sky_night;
            }
        }

        return icon;
    }

    protected async requestData(lat: string, long: string): Promise<Response> {
        const max = 9; // the maximum precision allowed by the api (including decimal point)
        const result = await fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'
            + long.substr(0, max) + '/lat/' + lat.substr(0, max) + '/data.json');

        if (!result.ok) {
            throw new Error("Weather response error! status: ' + result.status")
        }

        return result;
    }

    protected fillForecast(json: any, forecast: IWeatherForecast): void {
        const timeSeries: [] = json['timeSeries'];

        // --- Fill hours ---
        let hoursIndex = 0;
        let timeSeriesIndex = 0;
        while (hoursIndex < forecast.hours.length && timeSeriesIndex < timeSeries.length) {
            const timeSerie: any = timeSeries[timeSeriesIndex];
            const timeSerieDate = new Date(timeSerie.validTime);

            // If this time serie is to old
            if (forecast.hours[hoursIndex].date < timeSerieDate) {
                hoursIndex++;
                continue;
            }
            // If this time serie is not old enough
            if (forecast.hours[hoursIndex].date > timeSerieDate) {
                timeSeriesIndex++;
                continue;
            }

            const parameters: any[] = timeSerie.parameters;

            let weather = forecast.hours[hoursIndex].weather[this.name];

            //fillSingleWeather(parameters, weather);

            weather.temperature = parameters.find(e => e.name === "t").values[0];
            weather.precipitation = parameters.find(e => e.name === "pmean").values[0];
            weather.precipitationUnit = "mm";
            weather.wind = parameters.find(e => e.name === "ws").values[0];
            weather.gust = parameters.find(e => e.name === "gust").values[0];
            weather.symbol = this.getIcon(parameters.find(e => e.name === "Wsymb2").values[0] as never, timeSerieDate)

            hoursIndex++;
            timeSeriesIndex++;
        }

        // --- Fill days ---
        timeSeriesIndex = 0;
        for (let i = 0; i < forecast.days.length; i++) {
            const day = forecast.days[i];
            for (let j = 0; j < day.spans.length; j++) {

                const span = day.spans[j];
                const timeSerie: any = timeSeries[timeSeriesIndex];
                const timeSerieDate: Date = new Date(timeSerie.validTime);

                // If this time serie is to old
                if (span.startDate < timeSerieDate) {
                    continue;
                }
                // If this time serie is not old enough
                if (span.startDate > timeSerieDate) {
                    timeSeriesIndex++;
                    j--;
                    continue;
                }

                let weather = span.weather[this.name];

                const iconDate = new Date((span.startDate.getTime() + span.endDate.getTime()) / 2);

                timeSeriesIndex = this.sumWeather(timeSeries, timeSeriesIndex, span.endDate, iconDate, weather);
            }
        }
    }

    /**
     * Sums the weather in a time series from an index up to an end date.
     * The weather will be added to the given weather object.
     * The index of the end date will be returned.
     * @returns Index of the end date.
     */
    private sumWeather(timeSeries: any[], startIndex: number, endDate: Date, symbolDate: Date, weather: IWeather): number {
        let index = startIndex;

        let totalPrecipitation = 0;
        let minTemp: number = NaN;
        let maxTemp: number = NaN;
        let maxWind: number = 0;
        let maxGust: number = 0;
        let symbols: { [key: number]: number } = {}

        while (index < timeSeries.length) {
            const timeSerie = timeSeries[index];
            const timeSerieDate: Date = new Date(timeSerie.validTime);

            if (timeSerieDate > endDate) {
                index--
                break;
            }

            const parameters: any[] = timeSerie.parameters;

            // Precipitation
            totalPrecipitation += parameters.find(e => e.name === "pmean").values[0];

            // Temperature
            const temp = parameters.find(e => e.name === "t").values[0];
            if (isNaN(minTemp) || temp < minTemp) {
                minTemp = temp;
            }
            if (isNaN(maxTemp) || temp > maxTemp) {
                maxTemp = temp;
            }
            // Wind
            const wind = parameters.find(e => e.name === "ws").values[0];
            if (wind > maxWind) {
                maxWind = wind;
            }
            // Gust
            const gust = parameters.find(e => e.name === "gust").values[0];
            if (gust > maxGust) {
                maxGust = gust;
            }
            //= parameters.find(e => e.name === "pmean").values[0];
            //= parameters.find(e => e.name === "ws").values[0];
            //= parameters.find(e => e.name === "gust").values[0];
            //= this.getIcon(parameters.find(e => e.name === "Wsymb2").values[0] as never, timeSerieDate)

            const symbol: number = parameters.find(e => e.name === "Wsymb2").values[0];
            if (symbol in symbols) {
                symbols[symbol] += 1;
            } else {
                symbols[symbol] = 1;
            }

            index++;
        }

        const count = index - startIndex + 1;

        weather.precipitation = Math.round(10 * totalPrecipitation / count) / 10;
        weather.precipitationUnit = "mm/h";
        weather.temperatureMax = maxTemp;
        weather.temperatureMin = minTemp;
        weather.temperature = (maxTemp + minTemp) / 2;
        weather.wind = maxWind;
        weather.gust = maxGust;

        let maxSymbolCount = 0;
        let maxSymbol = "";
        for (let symbol in symbols) {
            const symbolCount = symbols[symbol];
            if (symbolCount > maxSymbolCount) {
                maxSymbolCount = symbolCount;
                maxSymbol = symbol;
            }
        }

        weather.symbol = this.getIcon(maxSymbol as never, symbolDate);

        return index;
    }
}
