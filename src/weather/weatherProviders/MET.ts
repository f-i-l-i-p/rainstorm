import { isNight, isSpanNight, toNight } from "../iconMaker";
import { IWeatherForecast, WeatherIcon } from "../types";
import AbstractProvider from "./abstractProvider";


export default class MET extends AbstractProvider {
    constructor() {
        super("Yr")
    }

    // Icon list: https://api.met.no/weatherapi/weathericon/2.0/documentation
    private icons: any = {
        "clearsky": WeatherIcon.clear_sky_day,
        "cloudy": WeatherIcon.cloudy,
        "fair": WeatherIcon.nearly_clear_sky_day,
        "fog": WeatherIcon.fog,
        "heavyrain": WeatherIcon.heavy_rain,
        "heavyrainandthunder": WeatherIcon.thunder,
        "heavyrainshowers": WeatherIcon.heavy_rain,
        "heavyrainshowersandthunder": WeatherIcon.thunder,
        "heavysleet": WeatherIcon.heavy_sleet,
        "heavysleetandthunder": WeatherIcon.thunder,
        "heavysleetshowers": WeatherIcon.heavy_sleet,
        "heavysleetshowersandthunder": WeatherIcon.thunder,
        "heavysnow": WeatherIcon.snow,
        "heavysnowandthunder": WeatherIcon.thunder,
        "heavysnowshowers": WeatherIcon.snow,
        "heavysnowshowersandthunder": WeatherIcon.thunder,
        "lightrain": WeatherIcon.light_rain,
        "lightrainandthunder": WeatherIcon.thunder,
        "lightrainshowers": WeatherIcon.light_rain,
        "lightrainshowersandthunder": WeatherIcon.thunder,
        "lightsleet": WeatherIcon.light_sleet,
        "lightsleetandthunder": WeatherIcon.thunder,
        "lightsleetshowers": WeatherIcon.light_sleet,
        "lightsnow": WeatherIcon.snow,
        "lightsnowandthunder": WeatherIcon.thunder,
        "lightsnowshowers": WeatherIcon.snow,
        "lightssleetshowersandthunder": WeatherIcon.thunder,
        "lightssnowshowersandthunder": WeatherIcon.thunder,
        "partlycloudy": WeatherIcon.half_clear_sky_day,
        "rain": WeatherIcon.moderate_rain,
        "rainandthunder": WeatherIcon.thunder,
        "rainshowers": WeatherIcon.moderate_rain,
        "rainshowersandthunder": WeatherIcon.thunder,
        "sleet": WeatherIcon.moderate_sleet,
        "sleetandthunder": WeatherIcon.thunder,
        "sleetshowers": WeatherIcon.moderate_sleet,
        "sleetshowersandthunder": WeatherIcon.thunder,
        "snow": WeatherIcon.snow,
        "snowandthunder": WeatherIcon.thunder,
        "snowshowers": WeatherIcon.snow,
        "snowshowersandthunder": WeatherIcon.thunder,
    }

    protected async requestData(lat: string, long: string): Promise<Response> {
        const result = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat='
            + lat + '&lon=' + long);

        if (!result.ok) {
            throw new Error("Weather response error! status: " + result.status)
        }

        return result;
    }

    public fillForecast(forecast: IWeatherForecast): void {
        const timeSeries: any[] = this.responseJson.properties.timeseries;

        // --- Fill hours ---
        let hoursIndex = 0;
        let timeSeriesIndex = 0;
        while (hoursIndex < forecast.hours.length && timeSeriesIndex < timeSeries.length) {
            const timeSerie: any = timeSeries[timeSeriesIndex];
            const timeSerieDate: Date = new Date(timeSerie.time);

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

            let weather = forecast.hours[hoursIndex].weather[this.name];

            let symbol_str: string;
            let precipitation: number;
            if (timeSerie.data.next_1_hours) {
                symbol_str = timeSerie.data.next_1_hours.summary.symbol_code;
                precipitation = timeSerie.data.next_1_hours.details.precipitation_amount;
            }
            else if (timeSerie.data.next_6_hours) {
                symbol_str = timeSerie.data.next_6_hours.summary.symbol_code;
                precipitation = timeSerie.data.next_6_hours.details.precipitation_amount;
            }
            else if (timeSerie.data.next_12_hours) {
                symbol_str = timeSerie.data.next_12_hours.summary.symbol_code;
                precipitation = timeSerie.data.next_12_hours.details.precipitation_amount;
            }
            else {
                continue;
            }

            // Remove _day or _night
            symbol_str = symbol_str.split("_")[0];

            let symbol = this.icons[symbol_str] || WeatherIcon.unknown;
            if (isNight(timeSerieDate, forecast.sunTimes)) {
                symbol = toNight(symbol);
            }

            if (symbol === WeatherIcon.unknown) {
                console.warn("Unknown symbol", symbol_str)
            }

            weather.temperature = timeSerie.data.instant.details.air_temperature;
            weather.wind = timeSerie.data.instant.details.wind_speed;
            weather.gust = timeSerie.data.instant.details.wind_speed_of_gust;
            weather.precipitation = precipitation;
            weather.precipitationUnit = "mm";
            weather.symbol = symbol;

            timeSeriesIndex++;
            hoursIndex++;
        }

        // --- Fill days ---
        timeSeriesIndex = 0;
        for (let i = 0; i < forecast.days.length; i++) {
            const day = forecast.days[i];
            for (let j = 0; j < day.spans.length; j++) {

                if (timeSeriesIndex >= timeSeries.length) {
                    break;
                }

                const span = day.spans[j];
                const timeSerie = timeSeries[timeSeriesIndex];
                const timeSerieDate: Date = new Date(timeSerie.time);

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

                // Get span length in hours
                const spanLength = (span.endDate.getTime() - span.startDate.getTime()) / (1000 * 60 * 60);

                let symbol_str: string;
                let precipitation: number;
                let minTemp: number;
                let maxTemp: number;
                if (spanLength === 6) {
                    symbol_str = timeSerie.data.next_6_hours.summary.symbol_code;
                    precipitation = timeSerie.data.next_6_hours.details.precipitation_amount;
                    minTemp = timeSerie.data.next_6_hours.details.air_temperature_min;
                    maxTemp = timeSerie.data.next_6_hours.details.air_temperature_max;
                }
                else if (spanLength === 12) {
                    const nextTimeSerie = timeSeries[timeSeriesIndex + 1];

                    symbol_str = timeSerie.data.next_12_hours.summary.symbol_code;

                    const pThis = timeSerie.data.next_6_hours.details.precipitation_amount;
                    const pNext = nextTimeSerie.data.next_6_hours.details.precipitation_amount;

                    precipitation = Math.round(10 * ((pThis + pNext) / 12)) / 10;

                    minTemp = Math.min(timeSerie.data.next_6_hours.details.air_temperature_min, nextTimeSerie.data.next_6_hours.details.air_temperature_min);
                    maxTemp = Math.max(timeSerie.data.next_6_hours.details.air_temperature_max, nextTimeSerie.data.next_6_hours.details.air_temperature_max);
                }
                else {
                    console.warn("Unknown span length", spanLength)
                    timeSeriesIndex++;
                    continue;
                }

                // Remove _day or _night
                symbol_str = symbol_str.split("_")[0];

                let symbol = this.icons[symbol_str] || WeatherIcon.unknown;
                if (isSpanNight(span.startDate, span.endDate, forecast.sunTimes)) {
                    symbol = toNight(symbol);
                }

                if (symbol === WeatherIcon.unknown) {
                    console.warn("Unknown symbol", symbol_str)
                }

                weather.temperature = (maxTemp + minTemp) / 2;
                weather.temperatureMax = maxTemp;
                weather.temperatureMin = minTemp;
                weather.wind = timeSerie.data.instant.details.wind_speed; // TODO: Find max wind speed
                weather.gust = timeSerie.data.instant.details.wind_speed_of_gust; // TODO: Find max gust speed
                weather.precipitation = precipitation;
                weather.precipitationUnit = "mm";
                weather.symbol = symbol;

                timeSeriesIndex++;
            }
        }
    }
}