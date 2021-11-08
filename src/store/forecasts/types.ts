import { IWeatherForecast } from "../../weather/types";

export interface IWeatherState {
    forecast: IWeatherForecast,
    isLoading: boolean
    errorMessage?: string,
}

export const FORECAST_FETCH_START = 'FORECAST_FETCH_START';

interface IFetchStartAction {
    type: typeof FORECAST_FETCH_START,
}

export const FORECAST_FETCH_SUCCESS = 'FORECAST_FETCH_SUCCESS';

interface IFetchSuccessAction {
    type: typeof FORECAST_FETCH_SUCCESS,
    forecast: IWeatherForecast,
}

export const FORECAST_FETCH_FAILURE = 'FORECAST_FETCH_FAILURE';

interface IFetchFailureAction {
    type: typeof FORECAST_FETCH_FAILURE,
    errorMessage: string,
}

export type ForecastActionTypes = IFetchStartAction | IFetchSuccessAction | IFetchFailureAction;