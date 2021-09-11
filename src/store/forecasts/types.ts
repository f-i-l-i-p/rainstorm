import { IForecast, IWeatherProvider } from "../../weather/types";

export interface IWeatherStateForecast {
    weatherProvider: IWeatherProvider;
    loading: boolean;
    forecast: IForecast;
}

export interface ITest {
    value: string;
}

export interface IWeatherState {
    weatherStateForecasts: IWeatherStateForecast[],
    tests: ITest[],
    displayTimes: Date[],
    nothing: number,
}

export const FORECAST_FETCH_START = 'FORECAST_FETCH_START';

interface IFetchStartAction {
    type: typeof FORECAST_FETCH_START,
    provider: IWeatherProvider
}

export const FORECAST_FETCH_SUCCESS = 'FORECAST_FETCH_SUCCESS';

interface IFetchSuccessAction {
    type: typeof FORECAST_FETCH_SUCCESS,
    forecast: IForecast,
    provider: IWeatherProvider
}

export const FORECAST_FETCH_FAILURE = 'FORECAST_FETCH_FAILURE';

interface IFetchFailureAction {
    type: typeof FORECAST_FETCH_FAILURE,
    errorMessage: string,
    provider: IWeatherProvider
}

export const SET_DISPLAY_TIMES = 'SET_DISPLAY_TIMES';

interface ISetDisplayTimesAction {
    type: typeof SET_DISPLAY_TIMES,
    displayTimes: Date[]
}

export type ForecastActionTypes = IFetchStartAction | IFetchSuccessAction | IFetchFailureAction | ISetDisplayTimesAction;