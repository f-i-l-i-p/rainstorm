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

            const parameters: [] = time['parameters']

            // Weather parameter descriptions can be found at:
            // https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-table

            const weather: IWeather = {
                temperature: parameters['t']['values'][0],
                wind: 0,
                gust: 0,
                symbol: 'unknown'
            }

            /**
            parameters.forEach(parameter => {
                switch (parameter['name']) {
                    case 't':
                        timePoint.weather.temperature = parameter['values'][0];
                        break;
                    case 'ws':
                        timePoint.weather.wind = parameter['values'][0];
                        break;
                    case 'gust':
                        timePoint.weather.gust = parameter['values'][0];
                        break;
                    case 'Wsymb2':
                        timePoint.weather.symbol = getIcon(Number(parameter['values'][0]));
                        break;
                }
            });
            timePoints.push(timePoint);
             */

            forecast.weatherPoints.set(date, weather);
        });

        return forecast;
    }
}