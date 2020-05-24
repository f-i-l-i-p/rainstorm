import { IForecast, ITimePoint, IWeatherProvider } from "../types";

// Fetches weather data from SMHI
export async function fetchSMHIWeather(lat: string, long: string): Promise<IForecast> {
    const max = 9; // the maximum precision allowed by the api (including decimal point)
    const result = await fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'
        + long.substr(0, max) + '/lat/' + lat.substr(0, max) + '/data.json');

    if (result.ok !== true) {
        console.error('Weather response error! status: ' + result.status);
    }

    return {
        weatherProvider: {
            name: 'SMHI',
            logo: ''
        },
        times: result.ok ? SMHIToITimePoints(await result.json()) : [],
    };
}

// Converts JSON data from SMHI to an ITimePoint array
function SMHIToITimePoints(json: any): ITimePoint[] {
    let timePoints: ITimePoint[] = []

    try {
        let ts: [any] = json['timeSeries'];

        let tempIndex: number, windIndex: number, gustIndex: number, symbolIndex: number;

        const testParams: [any] = ts[0]['parameters'];
        console.log(testParams);
        for (let i = 0; i < testParams.length; i++) {
            console.log(testParams[i].name);
            switch (testParams[i].name) {
                case 't':
                    tempIndex = i;
                    break;
                case 'ws':
                    windIndex = i;
                    break;
                case 'gust':
                    gustIndex = i;
                    break;
                case 'Wsymb2':
                    symbolIndex = i;
                    break;
            }
        }

        ts.forEach((element: any) => {
            const par = element['parameters']

            timePoints.push({
                time: new Date(element['validTime']),
                // Weather parameter descriptions can be found at:
                // https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-table
                weather: {
                    temperature: par[tempIndex]['values'][0],
                    wind: par[windIndex]['values'][0],
                    gust: par[gustIndex]['values'][0],
                    symbol: par[symbolIndex]['values'][0],
                }
            });
        });
    }
    catch (error) {
        console.error(error.message)
    }

    console.log(timePoints);

    return timePoints;
}

// Fetches weather data from MET
export async function fetchMETWeather(lat: string, long: string): Promise<IForecast> {
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