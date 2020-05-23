import { ILocationSearchState, LocationSearchActionTypes, SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILURE } from './types';

const initialState: ILocationSearchState = {
    searchResults: [],
    isLoading: false,
    errorMessage: ''
}

export function locationSearchReducer(state = initialState, action: LocationSearchActionTypes): ILocationSearchState {
    switch (action.type) {
        case SEARCH_START:
            return {
                ...state,
                isLoading: true
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                searchResults: action.results
            }
        case SEARCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                searchResults: [],
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}