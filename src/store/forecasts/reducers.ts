import { IWeatherState as IForecastState, ForecastActionTypes, FORECAST_FETCH_START, FORECAST_FETCH_SUCCESS, FORECAST_FETCH_FAILURE, SET_DISPLAY_TIMES, IWeatherStateForecast, ITest } from "./types";
import { listHoursFromNow } from "../../helpers/date";
import { IForecast, IWeatherProvider } from "../../weather/types";
import { getWeatherProviders } from "../../weather";
import { strictEqual } from "assert";

const initialState: IForecastState = {
    weatherStateForecasts: createInitialForecasts(),
    tests: createInitialTests(),
    displayTimes: listHoursFromNow(24),
    nothing: 1,
}

export function forecastReducer(state = initialState, action: ForecastActionTypes): IForecastState {
    switch (action.type) {
        case FORECAST_FETCH_START:
            console.log("Fetch start!!", state.weatherStateForecasts[0].loading)

            var newWeatherStateForecasts: IWeatherStateForecast[] = [...state.weatherStateForecasts];

            var weatherStateForecast = newWeatherStateForecasts.find(element => element.weatherProvider.name === action.provider.name);
            if (weatherStateForecast !== undefined) {
                weatherStateForecast.loading = true;
            }

            return {
                ...state,
                weatherStateForecasts: [...state.weatherStateForecasts],
            };

        case FORECAST_FETCH_SUCCESS:
            console.log("Fetch success!!", state.weatherStateForecasts[0].loading);

            var newWeatherStateForecasts: IWeatherStateForecast[] = [...state.weatherStateForecasts];

            var weatherStateForecast = newWeatherStateForecasts.find(element => element.weatherProvider.name === action.provider.name);
            if (weatherStateForecast !== undefined) {
                weatherStateForecast.loading = false;
                weatherStateForecast.forecast = action.forecast;
            }

            return {
                ...state,
                weatherStateForecasts: [...state.weatherStateForecasts],
            };

        case FORECAST_FETCH_FAILURE:
            console.log("Fetch fail", state)

            return { ...state }
        /*var forecasts = [...state.forecastMap];
        forecasts[action.id].isLoading = false;
        forecasts[action.id].errorMessage = action.errorMessage;

        return {
            ...state,
            forecastMap: forecasts,
        };*/
        case SET_DISPLAY_TIMES:
        /*return {
            ...state,
            displayTimes: action.displayTimes,
            displayForecasts: getNewDisplayForecasts(state.forecastMap, action.displayTimes),
        }*/
        default:
            return state;
    }
}

/*function getNewDisplayForecasts(forecasts: IForecast[], displayTimes: Date[]): IForecast[] {
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
}*/


function createInitialForecasts(): IWeatherStateForecast[] {
    let forecasts: IWeatherStateForecast[] = []
    const providers = getWeatherProviders();

    providers.forEach(provider => {
        let forecast: IWeatherStateForecast = {
            weatherProvider: provider,
            loading: false,
            forecast: {
                weatherPoints: new Map()
            }
        }
        forecasts.push(forecast)
    });

    console.log("Initial forecasts:", forecasts)

    return forecasts;
}

function createInitialTests(): ITest[] {
    const tests: ITest[] = [];

    tests.push({
        value: "one",
    });
    tests.push({
        value: "two",
    })

    return tests;
}