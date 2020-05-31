import { IWeatherState as IForecastState, ForecastActionTypes, FETCH_START, FETCH_SUCCESS, FETCH_FAILURE, SET_DISPLAY_TIMES } from "./types";
import { SMHIWeatherProvider } from "./providers/SMHI";
import { METWeatherProvider } from "./providers/MET";
import { IForecast } from "../types";
import { listHoursFromNow, listDaysFromNow } from "../../helpers/date";

const initialState: IForecastState = {
    forecasts: [
        {
            weatherProvider: SMHIWeatherProvider,
            isLoading: true,
            errorMessage: '',
            times: []
        },
        {
            weatherProvider: METWeatherProvider,
            isLoading: true,
            errorMessage: '',
            times: []
        }
    ],
    displayForecasts: [],
    displayTimes: listHoursFromNow(24)
}

export function forecastReducer(state = initialState, action: ForecastActionTypes): IForecastState {
    switch (action.type) {
        case FETCH_START:
            var forecasts = [...state.forecasts];
            forecasts[action.id].isLoading = true;

            return {
                ...state,
                forecasts: forecasts,
                displayForecasts: getNewDisplayForecasts(forecasts, state.displayTimes),
            };
        case FETCH_SUCCESS:
            var forecasts = [...state.forecasts];
            forecasts[action.id].isLoading = false;
            forecasts[action.id].times = action.forecast.times;

            console.log(action.forecast.times);

            return {
                ...state,
                forecasts: forecasts,
                displayForecasts: getNewDisplayForecasts(forecasts, state.displayTimes),
            };
        case FETCH_FAILURE:
            var forecasts = [...state.forecasts];
            forecasts[action.id].isLoading = false;
            forecasts[action.id].errorMessage = action.errorMessage;

            return {
                ...state,
                forecasts: forecasts,
            };
        case SET_DISPLAY_TIMES:
            return {
                ...state,
                displayForecasts: getNewDisplayForecasts(state.forecasts, state.displayTimes),
                displayTimes: action.displayTimes,
            }
        default:
            return state;
    }
}

function getNewDisplayForecasts(forecasts: IForecast[], displayTimes: Date[]): IForecast[] {
    let displayForecasts: IForecast[] = [];

    // add forecasts
    forecasts.forEach(forecast => {
        displayForecasts.push({
            ...forecast,
            times: []
        });
    });

    // add times to forecasts
    displayTimes.forEach(dTime => {
        for (let forecastID = 0; forecastID < forecasts.length; forecastID++) {
            for (let timePoint of forecasts[forecastID].times) {
                if (dTime.getTime() === timePoint.time.getTime()) {
                    displayForecasts[forecastID].times.push(timePoint);
                    break;
                }
            }
        }
    });

    return displayForecasts;
}
