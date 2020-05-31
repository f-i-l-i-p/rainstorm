import { IForecast } from "../types";

export interface IWeatherState {
    forecasts: IForecast[],
    displayTimes: Date[],
    displayForecasts: IForecast [],
}

export const FETCH_START = 'FETCH_START';

interface IFetchStartAction {
    type: typeof FETCH_START,
    id: number
}

export const FETCH_SUCCESS = 'FETCH_SUCCESS';

interface IFetchSuccessAction {
    type: typeof FETCH_SUCCESS,
    forecast: IForecast,
    id: number
}

export const FETCH_FAILURE = 'FETCH_FAILURE';

interface IFetchFailureAction {
    type: typeof FETCH_FAILURE,
    errorMessage: string,
    id: number
}

export const SET_DISPLAY_TIMES = 'SET_DISPLAY_TIMES';

interface ISetDisplayTimesAction {
    type: typeof SET_DISPLAY_TIMES,
    displayTimes: Date[]
}

export type ForecastActionTypes = IFetchStartAction | IFetchSuccessAction | IFetchFailureAction | ISetDisplayTimesAction;