import { IWeatherState as IForecastState, ForecastActionTypes, FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "./types";

const initialState: IForecastState = {
    forecasts: [],
    isLoading: false,
    errorMessage: ''
}

export function forecastReducer(state = initialState, action: ForecastActionTypes): IForecastState {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                forecasts: action.forecasts
            };
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}