import { IWeatherState as IForecastState, ForecastActionTypes, FORECAST_FETCH_START, FORECAST_FETCH_SUCCESS, FORECAST_FETCH_FAILURE, SET_DISPLAY_TIMES, IWeatherStateForecast } from "./types";
import { listHoursFromNow } from "../../helpers/date";
import { getWeatherProviders } from "../../weather";

const initialState: IForecastState = {
    weatherStateForecasts: createInitialForecasts(),
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

            // TODO: Implement

            return { ...state }

        case SET_DISPLAY_TIMES:
            // TODO: remove?
            return state;

        default:
            return state;
    }
}

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
