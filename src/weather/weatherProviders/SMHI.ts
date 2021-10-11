import logo from '../../icons/provider logos/SMHI.jpg'
import { IForecast, IWeather, WeatherIcon } from "../types";
import AbstractProvider from "./abstractProvider";


export default class SMHI extends AbstractProvider {
    constructor() {
        super("SMHI", logo)
    }

    private icons = {
        1: WeatherIcon.clear_sky,          // Clear sky
        2: WeatherIcon.nearly_clear_sky,   // Nearly clear sky
        3: WeatherIcon.half_clear_sky,     // Variable cloudiness
        4: WeatherIcon.half_clear_sky,     // Half clear sky
        5: WeatherIcon.cloudy_sky,         // Cloudy sky
        6: WeatherIcon.overcast,           // Overcast
        18: WeatherIcon.light_rain,        // Light rain
        19: WeatherIcon.moderate_rain,     // Moderate rain
        //20: WeatherIcon.heavy_rain,        // Heavy rain
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

    protected async formatResponse(response: Response): Promise<IForecast> {
        let forecast: IForecast = {
            weatherPoints: new Map()
        }

        const json = await response.json();

        const timeSeries: [] = json['timeSeries'];

        timeSeries.forEach((time: any) => {
            // Get the time:
            const date = new Date(time['validTime']);

            // Get the weather for this time:

            // Weather parameter descriptions can be found at:
            // https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-table

            const parameters: [] = time['parameters']

            const weather: IWeather = {
                temperature: NaN,
                wind: NaN,
                gust: NaN,
                symbol: WeatherIcon.unknown,
            }

            // TODO: Optimize. Don't loop through all parameters.
            parameters.forEach(parameter => {
                const value = parameter['values'][0];
                switch (parameter['name']) {
                    case 't':
                        weather.temperature = value;
                        break;
                    case 'ws':
                        weather.wind = value;
                        break;
                    case 'gust':
                        weather.gust = value;
                        break;
                    case 'Wsymb2':
                        let icon = this.icons[value];
                        if (!icon) {
                            console.warn("Unknown symbol value", value)
                            weather.symbol = WeatherIcon.unknown;
                            break;
                        }
                        weather.symbol = this.icons[value];
                        break;
                }
            });

            forecast.weatherPoints.set(date, weather);
        });

        return forecast;
    }
}