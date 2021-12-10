import { createEmptyForecast } from "./emptyForecast";
import { ILocation } from "../location/types";
import { getSunTimes, SunTimeCallback, SunTimes } from "./sunrise";
import { IWeatherForecast } from "./types";
import AbstractProvider from "./weatherProviders/abstractProvider";
import MET from "./weatherProviders/MET";
import SMHI from "./weatherProviders/SMHI";

const weatherProviders: AbstractProvider[] = [new SMHI(), new MET()];

/**
 * Returns an array with the name of the weather providers
 */
export function getProviderNames(): string[] {
    return weatherProviders.map((provider) => { return provider.name });
}

export interface forecastCallback {
    onSuccess: (forecast: IWeatherForecast) => void,
}

/**
 * Makes a new forecast that is returned with a callback.
 * @param location Location for the forecast.
 * @param callback Callback when done.
 */
export async function newForecast(location: ILocation, callback: forecastCallback): Promise<void> {
    /**
     * Create an empty forecast. Fetch the sun times. Also make each weather provider fetch weather data.
     * When the provider has gotten its response, let that provider fill in its data in the forecast.
     * If the fetch request for a weather provider is done before the sun times. The provider will be put
     * in a waiting list and fills in the weather data when the sun times has been fetched.
     */

    const forecast = createEmptyForecast(location);

    let sunTimesDone = false;
    let sunTimes: SunTimes;

    let remainingProviders = weatherProviders.length; // Number of providers waiting for a fetch response.
    let waitingProviders: AbstractProvider[] = [];

    const onProviderResponse = (provider: AbstractProvider) => {
        if (!sunTimesDone) {
            waitingProviders.push(provider);
            return;
        }

        if (provider.canFillForecast()) {
            provider.fillForecast(forecast, sunTimes)
        }

        remainingProviders--;
        if (remainingProviders === 0) {
            callback.onSuccess(forecast);
        }
    };

    const onSunTimesResponse = (sunTimesResponse: SunTimes) => {
        sunTimes = sunTimesResponse;
        sunTimesDone = true;

        forecast.sunTimes = sunTimesResponse;

        waitingProviders.forEach(provider => {
            onProviderResponse(provider);
        });
    };

    const sunTimeCallback: SunTimeCallback = {
        onSuccess: (response: SunTimes) => {
            onSunTimesResponse(response);
        },
        onError: (error: Error) => {
            onSunTimesResponse({ sunrise: new Date(), sunset: new Date() });
        },
    };

    // Start sun times fetch request.
    getSunTimes(location, sunTimeCallback);

    // Start provider fetch requests.
    weatherProviders.forEach(provider => {
        provider.fetchForecast(
            location,
            () => { onProviderResponse(provider) },
            (error: Error) => { onProviderResponse(provider) }
        );
    });
}

