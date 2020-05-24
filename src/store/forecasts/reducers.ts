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
            console.log('start, id:' + action.id)

            var loading = [...state.isLoading];
            loading[action.id] = true;
            
            return {
                ...state,
                isLoading: loading
            };

        case FETCH_SUCCESS:
            console.log('success, id:' + action.id)

            var loadings1 = [...state.isLoading];
            loadings1[action.id] = false;

            var forecasts = [...state.forecasts];
            forecasts[action.id] = action.forecast;
            
            return {
                ...state,
                isLoading: loadings1,
                forecasts: forecasts
            };

        case FETCH_FAILURE:
            var loading = [...state.isLoading];
            loading[action.id] = false;

            var errors = [...state.errorMessages];
            errors[action.id] = action.errorMessage;

            return {
                ...state,
                isLoading: loading,
                errorMessages: errors
            }
        default:
            return state;
    }
}