import { ForecastActionTypes, FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "./types";
import { IForecast } from "../../weather/types";
import { ILocation } from "../types";
import { Dispatch } from "redux";
import { fetchSMHIWeather } from "./fetchForecast";

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
                searchSuccess([forecast])
            }
            else {
                searchFailure("Fetch forecast error.")
            }
        })
}