import { ILocation } from '../../geocode/types';

export interface ILocationSearchState {
    searchResults: ILocation[],
    isLoading: boolean,
    errorMessage: string
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

export type LocationSearchActionTypes = ISearchStartAction | ISearchSuccessAction | ISearchFailureAction;