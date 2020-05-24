import { IWeatherState as IForecastState, ForecastActionTypes, FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "./types";
import { SMHIWeatherProvider } from "./providers/SMHI";
import { METWeatherProvider } from "./providers/MET";

const initialState: IForecastState = {
    forecasts: [{weatherProvider: SMHIWeatherProvider, times: []}, {weatherProvider: METWeatherProvider, times:[]}],
    isLoading: [],
    errorMessages: []
}

export function forecastReducer(state = initialState, action: ForecastActionTypes): IForecastState {
    switch (action.type) {
        case FETCH_START:
            var loadings = [...state.isLoading];
            loadings[action.id] = true;
            
            return {
                ...state,
                isLoading: loadings
            };

        case FETCH_SUCCESS:
            var loadings = [...state.isLoading];
            loadings[action.id] = false;

            var forecasts = [...state.forecasts];
            forecasts[action.id] = action.forecast;
            
            return {
                ...state,
                isLoading: loadings,
                forecasts: forecasts
            };

        case FETCH_FAILURE:
            var loadings = [...state.isLoading];
            loadings[action.id] = false;

            var errors = [...state.errorMessages];
            errors[action.id] = action.errorMessage;

            return {
                ...state,
                isLoading: loadings,
                errorMessages: errors
            }
        default:
            return state;
    }
}