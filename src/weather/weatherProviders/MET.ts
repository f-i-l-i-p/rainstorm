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
        const timeSeries: [] = json.properties.timeseries;

        console.log("forecast", forecast);
        console.log("json", json);

        // --- Fill hours ---
        let hoursIndex = 0;
        let timeSeriesIndex = 0;
        while (hoursIndex < forecast.hours.length) {
            const timeSerie: any = timeSeries[timeSeriesIndex];
            const timeSerieDate: Date = new Date(timeSerie.time);

            //console.log("serie", timeSerieDate)

            // If this time serie is not old enough
            if (forecast.hours[hoursIndex].date < timeSerieDate) {
                hoursIndex++;
                continue;
            }
            // If this time serie is to old
            if (forecast.hours[hoursIndex].date > timeSerieDate) {
                timeSeriesIndex++;
                continue;
            }

            let weather = forecast.hours[hoursIndex].weather[this.name];

            //console.log(weather);

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
            weather.symbol = symbol;

            timeSeriesIndex++;
            hoursIndex++;
        }
    }
}