import { IWeatherForecast, WeatherIcon } from "../types";
import AbstractProvider from "./abstractProvider";


export default class MET extends AbstractProvider {
    constructor() {
        super("Yr")
    }

    // Icon list: https://api.met.no/weatherapi/weathericon/2.0/documentation
    private icons: any = {
        "heavyrain": WeatherIcon.heavy_rain,
        "lightrain": WeatherIcon.light_rain,
        "rain": WeatherIcon.moderate_rain,
        "clearsky_day": WeatherIcon.clear_sky_day,
        "clearsky_night": WeatherIcon.clear_sky_day,
        "fair_day": WeatherIcon.nearly_clear_sky_day,
        "fair_night": WeatherIcon.nearly_clear_sky_day,
        "partlycloudy_day": WeatherIcon.half_clear_sky_day,
        "partlycloudy_night": WeatherIcon.half_clear_sky_day,
        "cloudy": WeatherIcon.cloudy_sky,
        "fog": WeatherIcon.fog,
        "heavysnow": WeatherIcon.snow,
        "heavysnowshowers": WeatherIcon.snow,
        "lightsnow": WeatherIcon.snow,
        "lightsnowshowers": WeatherIcon.snow,
        "snow": WeatherIcon.snow,
        "heavysleet": WeatherIcon.heavy_sleet,
        "heavysleetshowers": WeatherIcon.heavy_sleet,
        "lightsleet": WeatherIcon.light_sleet,
        "lightsleetshowers": WeatherIcon.light_sleet,
        "sleet": WeatherIcon.moderate_sleet,
        "sleetshowers": WeatherIcon.moderate_sleet,
    }

    private toNight(icon: WeatherIcon, date: Date): WeatherIcon {
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
        const result = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat='
            + lat + '&lon=' + long);

        if (!result.ok) {
            throw new Error("Weather response error! status: " + result.status)
        }

        return result;
    }

    protected fillForecast(json: any, forecast: IWeatherForecast): void {
        const timeSeries: any[] = json.properties.timeseries;

        console.log("forecast", forecast);
        console.log("json", json);

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

            const symbol = this.toNight(this.icons[symbol_str] || WeatherIcon.unknown, timeSerieDate);
            if (symbol === WeatherIcon.unknown) {
                console.warn("Unknown symbol", symbol_str)
            }

            weather.temperature = timeSerie.data.instant.details.air_temperature;
            weather.wind = timeSerie.data.instant.details.wind_speed;
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
                    console.log("break");
                    break;
                }

                const span = day.spans[j];
                const timeSerie = timeSeries[timeSeriesIndex];
                const timeSerieDate: Date = new Date(timeSerie.time);

                console.log("span", j, span);

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

                const symbol = this.toNight(this.icons[symbol_str] || WeatherIcon.unknown, timeSerieDate);
                if (symbol === WeatherIcon.unknown) {
                    console.warn("Unknown symbol", symbol_str)
                }

                weather.temperature = (maxTemp + minTemp) / 2;
                weather.temperatureMax = maxTemp;
                weather.temperatureMin = minTemp;
                weather.wind = timeSerie.data.instant.details.wind_speed; // TODO: Find max wind speed
                weather.gust = timeSerie.data.instant.details.wind_speed_of_gust; // TODO: Find max gust speed
                weather.precipitation = precipitation;
                weather.precipitationUnit = "mm/h";
                weather.symbol = symbol;

                timeSeriesIndex++;
            }
        }
    }
}