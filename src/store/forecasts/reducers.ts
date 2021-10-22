import { IWeatherState as IForecastState, ForecastActionTypes, FORECAST_FETCH_START, FORECAST_FETCH_SUCCESS, FORECAST_FETCH_FAILURE, SET_DISPLAY_TIMES, IWeatherStateForecast } from "./types";
import { listHoursFromNow } from "../../helpers/date";
import { getWeatherProviders } from "../../weather";

const initialState: IForecastState = {
    weatherStateForecasts: createInitialForecasts(),
    displayTimes: listHoursFromNow(24),
    nothing: 1,
}

export function forecastReducer(state = initialState, action: ForecastActionTypes): IForecastState {
    let newWeatherStateForecasts: IWeatherStateForecast[];
    let weatherStateForecast: IWeatherStateForecast | undefined;
    switch (action.type) {
        case FORECAST_FETCH_START:
            console.log("Fetch start!!")

            newWeatherStateForecasts = JSON.parse(JSON.stringify(state.weatherStateForecasts));

            weatherStateForecast = newWeatherStateForecasts.find(element => element.weatherProvider.name === action.provider.name);
            if (weatherStateForecast !== undefined) {
                weatherStateForecast.loading = true;
            }

            return {
                ...state,
                weatherStateForecasts: newWeatherStateForecasts,
            };

        case FORECAST_FETCH_SUCCESS:
            console.log("Fetch success!!");

            newWeatherStateForecasts = JSON.parse(JSON.stringify(state.weatherStateForecasts));

            weatherStateForecast = newWeatherStateForecasts.find(element => element.weatherProvider.name === action.provider.name);
            if (weatherStateForecast !== undefined) {
                weatherStateForecast.loading = false;
                weatherStateForecast.forecast = action.forecast;
            }

            return {
                ...state,
                weatherStateForecasts: newWeatherStateForecasts,
            };

        case FORECAST_FETCH_FAILURE:
            console.log("Fetch fail")

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
                weatherPoints: []
            }
        }
        forecasts.push(forecast)
    });

    console.log("Initial forecasts:", forecasts)

    return forecasts;
}
