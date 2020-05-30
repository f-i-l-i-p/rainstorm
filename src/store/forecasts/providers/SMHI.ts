import { IForecast, ITimePoint, IWeatherProvider } from "../../types";
import logo from '../../../icons/provider logos/SMHI.jpg'

export const SMHIWeatherProvider: IWeatherProvider = {
    name: 'SMHI',
    logo: logo
}

function getIcon(icon: number): string {
    switch (icon) {
        case 1:
            return "clear_sky";
        case 4:
            return "halfclear_sky";
        case 9:
            return "moderate_rain_showers";
        case 11:
            return "thunderstorm";
        case 19:
            return "moderate_rain";
        case 21:
            return "thunder";
        case 23:
            return "moderate_sleet";
        default:
            return "unknown";
    }
}

// Fetches weather data from SMHI
export async function fetchSMHIForecast(lat: string, long: string): Promise<IForecast> {
    const max = 9; // the maximum precision allowed by the api (including decimal point)
    const result = await fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'
        + long.substr(0, max) + '/lat/' + lat.substr(0, max) + '/data.json');

    if (result.ok !== true) {
        console.error('Weather response error! status: ' + result.status);
    }

    return {
        weatherProvider: SMHIWeatherProvider,
        times: result.ok ? SMHIToITimePoints(await result.json()) : [],
    };
}

// Converts JSON data from SMHI to an ITimePoint array
function SMHIToITimePoints(json: any): ITimePoint[] {
    let timePoints: ITimePoint[] = []

    try {
        let ts: [] = json['timeSeries'];

        ts.forEach((element: any) => {
            const parameters: [] = element['parameters']

            let timePoint: ITimePoint = {
                time: new Date(element['validTime']),
                weather: {
                    temperature: NaN,
                    wind: NaN,
                    gust: NaN,
                    symbol: '',
                }
            }

            for (let i = 0; i < parameters.length; i++) {
                const par = parameters[i];
                // Weather parameter descriptions can be found at:
                // https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-table
                switch (par['name']) {
                    case 't':
                        timePoint.weather.temperature = par['values'][0];
                        break;
                    case 'ws':
                        timePoint.weather.wind = par['values'][0];
                        break;
                    case 'gust':
                        timePoint.weather.gust = par['values'][0];
                        break;
                    case 'Wsymb2':
                        timePoint.weather.symbol = getIcon(Number(par['values'][0]));
                        break;
                }
            }
            timePoints.push(timePoint);
        });
    }
    catch (error) {
        console.error(error.message)
    }

    return timePoints;
}
