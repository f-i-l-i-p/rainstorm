import { IForecast } from "../types";
import { Interface } from "readline";

export interface IWeatherState {
    forecasts: IForecast[],
    isLoading: boolean,
    errorMessage: string
}

export const FETCH_START = 'FETCH_START';

interface IFetchStartAction {
    type: typeof FETCH_START,
}

export const FETCH_SUCCESS = 'FETCH_SUCCESS';

interface IFetchSuccessAction {
    type: typeof FETCH_SUCCESS,
    forecasts: IForecast[]
}

export const FETCH_FAILURE = 'FETCH_FAILURE';

interface IFetchFailureAction {
    type: typeof FETCH_FAILURE,
    errorMessage: string
}

export type ForecastActionTypes = IFetchStartAction | IFetchSuccessAction | IFetchFailureAction;