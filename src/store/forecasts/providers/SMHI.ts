import { IForecast, ITimePoint, IWeatherProvider } from "../../types";

export const SMHIWeatherProvider: IWeatherProvider = {
    name: 'SMHI',
    logo: ''
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
        let ts: [any] = json['timeSeries'];

        let tempIndex: number, windIndex: number, gustIndex: number, symbolIndex: number;

        const testParams: [any] = ts[0]['parameters'];
        for (let i = 0; i < testParams.length; i++) {
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

    return timePoints;
}