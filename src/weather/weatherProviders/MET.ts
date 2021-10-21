import logo from '../../icons/provider logos/SMHI.jpg'
import { IForecast, IWeather, IWeatherTime, WeatherIcon } from "../types";
import AbstractProvider from "./abstractProvider";


export default class MET extends AbstractProvider {
    constructor() {
        super("Yr", logo)
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
        if (hours > 17 || hours < 8) {
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

    protected async formatResponse(response: Response): Promise<IForecast> {
        let forecast: IForecast = {
            weatherPoints: [],
        }

        const json = await response.json();

        const timeSeries: [] = json.properties.timeseries;

        const currentDateTime = new Date().getTime();

        // Loop through all timeseries
        for (let i = 0; i < timeSeries.length; i++) {
            const timeobj: any = timeSeries[i];
            const date: Date = new Date(timeobj.time);

            // If this is old weather.
            if (date.getTime() < currentDateTime) {
                continue;
            }

            let symbol_str: string;
            let precipitation: number;
            if (timeobj.data.next_1_hours) {
                symbol_str = timeobj.data.next_1_hours.summary.symbol_code;
                precipitation = timeobj.data.next_1_hours.details.precipitation_amount;
            }
            else if (timeobj.data.next_6_hours) {
                symbol_str = timeobj.data.next_6_hours.summary.symbol_code;
                precipitation = timeobj.data.next_6_hours.details.precipitation_amount;
            }
            else if (timeobj.data.next_12_hours) {
                symbol_str = timeobj.data.next_12_hours.summary.symbol_code;
                precipitation = timeobj.data.next_12_hours.details.precipitation_amount;
            }
            else {
                continue;
            }

            const symbol = this.toNight(this.icons[symbol_str] || WeatherIcon.unknown, date);
            if (symbol === WeatherIcon.unknown) {
                console.warn("Unknown symbol", symbol_str)
            }

            const weather: IWeather = {
                temperature: timeobj.data.instant.details.air_temperature,
                wind: timeobj.data.instant.details.wind_speed,
                gust: NaN,
                precipitation: precipitation,
                symbol: symbol,
            }

            forecast.weatherPoints.push({ time: date, weather: weather })
        }

        return forecast;
    }
}