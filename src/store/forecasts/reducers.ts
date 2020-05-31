import { IWeatherState as IForecastState, ForecastActionTypes, FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "./types";
import { SMHIWeatherProvider } from "./providers/SMHI";
import { METWeatherProvider } from "./providers/MET";

const initialState: IForecastState = {
    forecasts: [
        {
            weatherProvider: SMHIWeatherProvider,
            isLoading: false,
            errorMessage: '',
            times: []
        },
        {
            weatherProvider: METWeatherProvider,
            isLoading: false,
            errorMessage: '',
            times: []
        }]
}

export function forecastReducer(state = initialState, action: ForecastActionTypes): IForecastState {
    switch (action.type) {
        case FETCH_START: {
            let forecasts = [...state.forecasts];
            forecasts[action.id].isLoading = true;

            return {
                ...state,
                forecasts: forecasts
            };
        }
        case FETCH_SUCCESS: {
            let forecasts = [...state.forecasts];
            forecasts[action.id].isLoading = false;
            forecasts[action.id].times = action.forecast.times;

            return {
                ...state,
                forecasts: forecasts
            };
        }
        case FETCH_FAILURE: {
            let forecasts = [...state.forecasts];
            forecasts[action.id].isLoading = false;
            forecasts[action.id].errorMessage = action.errorMessage;

            return {
                ...state,
                forecasts: forecasts
            };
        }
        default:
            return state;
    }
}