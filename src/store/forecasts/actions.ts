import { ForecastActionTypes, FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "./types";
import { IForecast } from "../types";
import { ILocation } from "../types";
import { Dispatch } from "redux";
import { fetchSMHIWeather, fetchMETWeather } from "./fetchForecast";

function searchStart(): ForecastActionTypes {
    return {
        type: FETCH_START,
    }
}

function searchSuccess(forecasts: IForecast[]): ForecastActionTypes {
    return {
        type: FETCH_SUCCESS,
        forecasts: forecasts
    }
}

function searchFailure(errorMessage: string): ForecastActionTypes {
    return {
        type: FETCH_FAILURE,
        errorMessage: errorMessage
    }
}

export const fetchForecasts = (location: ILocation) => async (dispatch: Dispatch) => {
    dispatch(searchStart());

    fetchSMHIWeather(location.lat.toString(), location.long.toString())
        .then(forecast => {
            if (forecast.times.length > 0){
                dispatch(searchSuccess([forecast]))
            }
            else {
                dispatch(searchFailure("Fetch forecast error."))
            }
        })
}