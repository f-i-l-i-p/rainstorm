import { IForecast, ITimePoint } from "../types";

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
    let timePoints : ITimePoint[] = []
    
    try {
        let ts = json['timeSeries'];

        ts.forEach((element: any) => {
            const par = element['parameters']

            timePoints.push({
                time: new Date(element['validTime']),
                // Weather parameter descriptions can be found at:
                // https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-table
                weather: {
                    temperature: par[11]['values'][0],
                    wind: par[14]['values'][0],
                    symbol: par[18]['values'][0],
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