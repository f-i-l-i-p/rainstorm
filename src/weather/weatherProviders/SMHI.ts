import logo from '../../icons/provider logos/SMHI.jpg'
import { IForecast, IWeather } from "../types";
import AbstractProvider from "./abstractProvider";


export default class SMHI extends AbstractProvider {
    constructor() {
        super("SMHI", logo)
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
                symbol: ''
            }

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
                        weather.symbol = value;
                        break;
                }
            });

            forecast.weatherPoints.set(date, weather);
        });

        return forecast;
    }
}