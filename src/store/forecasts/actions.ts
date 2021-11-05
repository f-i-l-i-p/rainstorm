import { ForecastActionTypes, FORECAST_FETCH_START, FORECAST_FETCH_SUCCESS, FORECAST_FETCH_FAILURE, SET_DISPLAY_TIMES } from "./types";
import { Dispatch } from "redux";
import { getWeatherProviders } from "../../weather";
import { IForecast, IWeatherProvider } from "../../weather/types";
import { ILocation } from "../../location/types";

function searchStart(provider: IWeatherProvider): ForecastActionTypes {
    return {
        type: FORECAST_FETCH_START,
        provider: provider
    }
}

function searchSuccess(provider: IWeatherProvider, forecast: IForecast): ForecastActionTypes {
    return {
        type: FORECAST_FETCH_SUCCESS,
        forecast: forecast,
        provider: provider
    }
}

function searchFailure(provider: IWeatherProvider, errorMessage: string): ForecastActionTypes {
    return {
        type: FORECAST_FETCH_FAILURE,
        errorMessage: errorMessage,
        provider: provider
    }
}

export const fetchForecasts = (location: ILocation) => async (dispatch: Dispatch) => {
    console.log(1);
    
    const onSuccess = (provider: IWeatherProvider, result: IForecast) => dispatch(searchSuccess(provider, result));
    const onFailure = (provider: IWeatherProvider, error: Error) => dispatch(searchFailure(provider, error.message));

    const providers = getWeatherProviders();

    providers.forEach(provider => {
        dispatch(searchStart(provider));
        provider.fetchForecast(location, (result: IForecast) => onSuccess(provider, result), (error: Error) => onFailure(provider, error));
    });

}

export function setDisplayTimes(displayTimes: Date[]) {
    return {
        type: SET_DISPLAY_TIMES,
        displayTimes: displayTimes
    };
}
