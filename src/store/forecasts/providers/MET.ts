import { IForecast, IWeatherProvider, ITimePoint, IWeather } from "../../types";
import logo from '../../../icons/provider logos/MET.jpg'

export const METWeatherProvider: IWeatherProvider = {
    name: 'MET',
    logo: logo
}

function getIcon(icon: number): string {
    switch (icon) {
        case 1:
            return "clear_sky";
        case 2:
            return "nearly_clear_sky";
        case 3:
            return "halfclear_sky";
        default:
            return "unknown";
    }
}

// Fetches weather data from MET
export async function fetchMETForecast(lat: string, long: string): Promise<IForecast> {
    const result = await fetch('https://api.met.no/weatherapi/locationforecast/1.9/?lat='
        + lat + '&lon=' + long);

    if (!result.ok) {
        console.error('MET weather response error! status: ' + result.status);
        return {
            weatherProvider: METWeatherProvider,
            times: []
        }
    }

    const text = await result.text();

    let json;
    const parseString = require('xml2js').parseString;
    parseString(text, function (err: any, result: any) {
        json = result;
    });

    return {
        weatherProvider: METWeatherProvider,
        times: METToITimePoints(json),
    };
}

// Converts json data from MET to an ITimePoint array
// TODO: add weather symbol
function METToITimePoints(json: any): ITimePoint[] {
    let timePoints: ITimePoint[] = []

    try {
        const times = json['weatherdata']['product'][0]['time'];

        for (let i = 0; i < times.length - 1; i += 1) {
            const timeObjectA = times[i];
            const timeObjectB = times[i + 1];

            const fromA = new Date(timeObjectA['$']['from']);
            const toA = new Date(timeObjectA['$']['to']);
            const fromB = new Date(timeObjectB['$']['from']);
            const toB = new Date(timeObjectB['$']['to']);

            if (fromA.getTime() === toA.getTime() &&
                fromA.getTime() === toB.getTime() &&
                toB.getTime() === fromB.getTime() + 1000 * 60 * 60) {

                const dataA = timeObjectA['location'][0];
                const dataB = timeObjectB['location'][0];

                timePoints.push({
                    time: fromA,
                    weather: {
                        temperature: dataA['temperature'][0]['$']['value'],
                        wind: dataA['windSpeed'][0]['$']['mps'],
                        gust: dataA['windGust'][0]['$']['mps'],
                        symbol: getIcon(Number(dataB['symbol'][0]['$']['number'])),
                    }
                });
            }
        }
    }
    catch (error) {
        console.error(error.message)
    }

    return timePoints;
}
