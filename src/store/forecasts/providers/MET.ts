import { IForecast, IWeatherProvider, ITimePoint } from "../../types";

export const METWeatherProvider: IWeatherProvider = {
    name: 'MET',
    logo: ''
}

// Fetches weather data from MET
export async function fetchMETForecast(lat: string, long: string): Promise<IForecast> {
    const weatherProvider: IWeatherProvider = {
        name: 'MET',
        logo: ''
    };

    const result = await fetch('https://api.met.no/weatherapi/locationforecast/1.9/?lat='
        + lat + '&lon=' + long);

    if (!result.ok) {
        console.error('MET weather response error! status: ' + result.status);
        return {
            weatherProvider: weatherProvider,
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
        weatherProvider: weatherProvider,
        times: METToITimePoints(json),
    };
}

// Converts json data from MET to an ITimePoint array
// TODO: add weather symbol
function METToITimePoints(json: any): ITimePoint[] {
    let timePoints: ITimePoint[] = []

    try {
        const times = json['weatherdata']['product'][0]['time'];
        console.log(times)

        times.forEach((timeObject: any) => {
            const from = timeObject['$']['from']
            const to = timeObject['$']['to']

            if (from === to){
                const data = timeObject['location'][0];

                timePoints.push({
                    time: new Date(from),
                    weather: {
                        temperature: data['temperature'][0]['$']['value'],
                        wind: data['windSpeed'][0]['$']['mps'],
                        gust: data['windGust'][0]['$']['mps'],
                        symbol: ''
                    }
                });
            }
        });
    }
    catch (error) {
        console.error(error.message)
    }

    console.log(timePoints);

    return timePoints;
}