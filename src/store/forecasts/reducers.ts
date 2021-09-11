import { IWeatherState as IForecastState, ForecastActionTypes, FORECAST_FETCH_START, FORECAST_FETCH_SUCCESS, FORECAST_FETCH_FAILURE, SET_DISPLAY_TIMES, IWeatherStateForecast } from "./types";
import { listHoursFromNow } from "../../helpers/date";
import { IForecast, IWeatherProvider } from "../../weather/types";
import { getWeatherProviders } from "../../weather";
import { strictEqual } from "assert";

const initialState: IForecastState = {
    weatherStateForecasts: createInitialForecasts(),
    displayTimes: listHoursFromNow(24),
    nothing: 1,
}

export function forecastReducer(state = initialState, action: ForecastActionTypes): IForecastState {
    switch (action.type) {
        case FORECAST_FETCH_START:
            var index = state.weatherStateForecasts.findIndex(element => element.weatherProvider.name === action.provider.name)

            var newWeatherStateForecasts: IWeatherStateForecast[] = []

            for (let i = 0; i < state.weatherStateForecasts.length; i++) {
                if (i !== index) {
                    newWeatherStateForecasts.push(state.weatherStateForecasts[i])
                }
                else {
                    let old = state.weatherStateForecasts[index];
                    newWeatherStateForecasts.push({
                        weatherProvider: old.weatherProvider,
                        loading: true,
                        forecast: old.forecast,
                    })
                }
            }

            var a = state.weatherStateForecasts.map((content) => {
                if (content.weatherProvider.name === action.provider.name) {
                    return {
                        weatherProvider: action.provider,
                        loading: true,
                        forecast: content.forecast
                    } as IWeatherStateForecast
                }
                else {
                    return content;
                }
            });

            a.push(a[0])
            a.splice(0, 0)

            console.log("new: ", newWeatherStateForecasts === state.weatherStateForecasts, newWeatherStateForecasts)

            return {
                ...state,
                weatherStateForecasts: a,
                nothing: state.nothing + 1,
            };
        case FORECAST_FETCH_SUCCESS:
            console.log("abcde")
            var weatherStateForecast = state.weatherStateForecasts.find(element => element.weatherProvider.name === action.provider.name)

            if (weatherStateForecast === undefined) {
                console.error("Can't find provider with name ", action.provider.name, " in state.")
                return {...state}
            }

            weatherStateForecast.loading = false;
            var weatherStateForecasts = [...state.weatherStateForecasts];

            return {
                ...state,
                weatherStateForecasts: weatherStateForecasts,
            };
        case FORECAST_FETCH_FAILURE:

            console.log("Fail")
            
            return {...state}
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

    console.log("Aadsfjalkdfjaslkdfj")
    console.log(forecasts)

    return forecasts;
}