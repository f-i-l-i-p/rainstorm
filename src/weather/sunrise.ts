import { ILocation } from "../location/types";

export interface SunTimeCallback {
    onSuccess: (sunTimes: SunTimes) => void,
    onError: (error: Error) => void,
}

export interface SunTimes {
    sunrise: Date,
    sunset: Date,
}

export async function getSunTimes(location: ILocation, callback: SunTimeCallback) {
    const url = "https://api.met.no/weatherapi/sunrise/2.0/.json";
    const dateString: string = (new Date()).toISOString().split('T')[0];

    const request = url + "?lat=" + location.lat + "&lon=" + location.long + "&date=" + dateString + "&offset=00:00";

    const result = await fetch(request);

    if (result.ok) {
        formatResponse(await result.json(), callback);
    } else {
        callback.onError(new Error());
    }
}

function formatResponse(json: any, callback: SunTimeCallback): void {
    try {
        const result: SunTimes = {
            sunrise: new Date(json.location.time[0].sunrise.time),
            sunset: new Date(json.location.time[0].sunset.time),
        }
        callback.onSuccess(result);
    } catch (e: unknown) {
        callback.onError(e as Error);
    }
}