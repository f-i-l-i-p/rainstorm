import { ILocation } from "../types";

export interface ILocationSearchState {
    selectedLocation?: ILocation,
    searchResults: ILocation[],
    isLoading: boolean,
    errorMessage: string,
    userLocation?: ILocation,
}

export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION';

interface IUpdateUserLocationAction {
    type: typeof UPDATE_USER_LOCATION,
    location?: ILocation
}

export const SELECT_LOCATION = 'SELECT_LOCATION';

interface ISelectLocationAction {
    type: typeof SELECT_LOCATION,
    selectedLocation: ILocation
}

export const SEARCH_START = 'SEARCH_START';

interface ISearchStartAction {
    type: typeof SEARCH_START,
}

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

interface ISearchSuccessAction {
    type: typeof SEARCH_SUCCESS,
    results: ILocation[]
}

export const SEARCH_FAILURE = 'SEARCH_FAILURE';

interface ISearchFailureAction {
    type: typeof SEARCH_FAILURE,
    errorMessage: string
}

export type LocationSearchActionTypes = IUpdateUserLocationAction | ISelectLocationAction | ISearchStartAction | ISearchSuccessAction | ISearchFailureAction;