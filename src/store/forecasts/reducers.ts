import { IWeatherState, ForecastActionTypes, FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "./types";

const initialState: IWeatherState = {
    forecasts: [],
    isLoading: false,
    errorMessage: ''
}

export function weatherReducer(state = initialState, action: ForecastActionTypes): IWeatherState {
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