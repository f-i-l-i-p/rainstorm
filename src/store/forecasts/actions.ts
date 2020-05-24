import { ForecastActionTypes, FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "./types";
import { IForecast } from "../types";
import { ILocation } from "../types";
import { Dispatch } from "redux";
import { fetchSMHIForecast } from "./providers/SMHI";
import { fetchMETForecast } from "./providers/MET";

function searchStart(id: number): ForecastActionTypes {
    return {
        type: FETCH_START,
        id: id
    }
}

function searchSuccess(id: number, forecast: IForecast): ForecastActionTypes {
    return {
        type: FETCH_SUCCESS,
        forecast: forecast,
        id: id
    }
}

function searchFailure(id: number, errorMessage: string): ForecastActionTypes {
    return {
        type: FETCH_FAILURE,
        errorMessage: errorMessage,
        id: id
    }
}


function fetchForecast(id: number, location: ILocation, fetchFunction: (lat: string, long: string) => Promise<IForecast>, dispatch: Dispatch) {
    dispatch(searchStart(id));

    fetchFunction(location.lat.toString(), location.long.toString())
        .then(forecast => {
            if (forecast.times.length > 0) {
                dispatch(searchSuccess(id, forecast))
            }
            else {
                dispatch(searchFailure(id, "Fetch forecast error."))
            }
        })
}

const fetchFunctions: ((lat: string, long: string) => Promise<IForecast>)[] = [fetchSMHIForecast, fetchMETForecast];

export const fetchForecasts = (location: ILocation) => async (dispatch: Dispatch) => {
    // fetchFunctions.forEach((fetchFunction, index) => {
    //     fetchForecast(index, location, fetchFunction, dispatch);
    // });

    fetchForecast(1, location, fetchMETForecast, dispatch);
    fetchForecast(0, location, fetchSMHIForecast, dispatch);
}

// export function fetchForecasts(location: ILocation) {
//     for (let i = 0; i < 2; i++) {
//         fetchForecast(i, location);
//     }
// }