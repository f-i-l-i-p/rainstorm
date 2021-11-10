import { IWeatherState as IForecastState, ForecastActionTypes, FORECAST_FETCH_START, FORECAST_FETCH_SUCCESS, FORECAST_FETCH_FAILURE } from "./types";
import { createEmptyForecast } from "../../weather";

const initialState: IForecastState = {
    forecast: createEmptyForecast(undefined),
    isLoading: true,
    errorMessage: undefined,
}

export function forecastReducer(state = initialState, action: ForecastActionTypes): IForecastState {
    switch (action.type) {
        case FORECAST_FETCH_START:
            return {
                ...state,
                isLoading: true,
            };

        case FORECAST_FETCH_SUCCESS:
            return {
                ...state,
                forecast: action.forecast,
                isLoading: false,
                errorMessage: undefined,
            };

        case FORECAST_FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage,
            }

        default:
            return state;
    }
}
