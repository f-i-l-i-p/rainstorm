import { ForecastActionTypes, FORECAST_FETCH_START, FORECAST_FETCH_SUCCESS, FORECAST_FETCH_FAILURE } from "./types";
import { Dispatch } from "redux";
import { ILocation } from "../../location/types";
import { forecastCallback, newForecast } from "../../weather";
import { IWeatherForecast } from "../../weather/types";

function searchStart(): ForecastActionTypes {
    return {
        type: FORECAST_FETCH_START,
    }
}

function searchSuccess(forecast: IWeatherForecast): ForecastActionTypes {
    return {
        type: FORECAST_FETCH_SUCCESS,
        forecast: forecast,
    }
}

function searchFailure(errorMessage: string): ForecastActionTypes {
    return {
        type: FORECAST_FETCH_FAILURE,
        errorMessage: errorMessage,
    }
}

export const fetchForecasts = (location: ILocation) => async (dispatch: Dispatch) => {
    const callback: forecastCallback = {
        onSuccess: (forecast: IWeatherForecast) => dispatch(searchSuccess(forecast)),
        onError: (errorMessage: string) => dispatch(searchFailure(errorMessage)),
    }

    dispatch(searchStart());
    newForecast(location, callback);
}
