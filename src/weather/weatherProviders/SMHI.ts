import logo from '../../icons/provider logos/SMHI.jpg'
import { IForecast, IWeather, WeatherIcon } from "../types";
import AbstractProvider from "./abstractProvider";


export default class SMHI extends AbstractProvider {
    constructor() {
        super("SMHI", logo)
    }

    private icons = {
        1: WeatherIcon.clear_sky_day,        // Clear sky
        2: WeatherIcon.nearly_clear_sky_day, // Nearly clear sky
        3: WeatherIcon.half_clear_sky_day,   // Variable cloudiness
        4: WeatherIcon.half_clear_sky_day,   // Half clear sky
        5: WeatherIcon.cloudy_sky,           // Cloudy sky
        6: WeatherIcon.cloudy_sky,           // Overcast
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

    protected async formatResponse(response: Response): Promise<IForecast> {
        let forecast: IForecast = {
            weatherPoints: [],
        }

        const json = await response.json();

        const timeSeries: [] = json['timeSeries'];

        const currentDateTime = new Date().getTime();

        timeSeries.forEach((time: any) => {
            // Get the time:
            const date = new Date(time['validTime']);

            if (date.getTime() >= currentDateTime) {
                // Get the weather for this time:

                // Weather parameter descriptions can be found at:
                // https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-table

                const parameters: [] = time['parameters']

                const weather: IWeather = {
                    temperature: NaN,
                    wind: NaN,
                    gust: NaN,
                    precipitation: NaN,
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
                        case 'pmean':
                            weather.precipitation = value;
                            break;
                        case 'Wsymb2':
                            weather.symbol = this.getIcon(value, date);
                            break;
                    }
                });

                forecast.weatherPoints.push({ time: date, weather: weather });
            }
        });

        return forecast;
    }
}