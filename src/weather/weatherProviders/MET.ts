import logo from '../../icons/provider logos/SMHI.jpg'
import { IForecast, IWeather, IWeatherTime, WeatherIcon } from "../types";
import AbstractProvider from "./abstractProvider";


export default class MET extends AbstractProvider {
    constructor() {
        super("Yr", logo)
    }

    private icons: any = {
        "lightrain": WeatherIcon.light_rain,
        3: WeatherIcon.light_rain,
        //20: WeatherIcon.heavy_rain,        // Heavy rain
    }

    protected async requestData(lat: string, long: string): Promise<Response> {
        const result = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat='
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

        // Loop through all timeseries
        for (let i = 0; i < timeSeries.length; i++) {
            const timeobj: any = timeSeries[i];
            const date: Date = new Date(timeobj.time);

            // If this is old weather.
            if (date.getTime() < new Date().getTime()) {
                continue;
            }

            let symbol: string;
            if (timeobj.data.next_1_hours) {
                symbol = timeobj.data.next_1_hours.summary.symbol_code;
            }
            else if (timeobj.data.next_12_hours) {
                symbol = timeobj.data.next_12_hours.summary.symbol_code;
            }
            else if (timeobj.data.next_12_hours) {
                symbol = timeobj.data.next_12_hours.summary.symbol_code;
            }
            else {
                continue;
            }

            const weather: IWeather = {
                temperature: timeobj.data.instant.details.air_temperature,
                wind: timeobj.data.instant.details.wind_speed,
                gust: NaN,
                symbol: this.icons[symbol] || WeatherIcon.unknown,
            }

            forecast.weatherPoints.push({ time: date, weather: weather })
        }

        return forecast;
    }
}