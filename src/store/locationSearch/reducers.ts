import { ILocationSearchState, LocationSearchActionTypes, SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILURE, SELECT_LOCATION } from './types';

const initialState: ILocationSearchState = {
    selectedLocation: undefined,
    searchResults: [],
    isLoading: false,
    errorMessage: ''
}

export function locationSearchReducer(state = initialState, action: LocationSearchActionTypes): ILocationSearchState {
    switch (action.type) {
        case SELECT_LOCATION:
            return {
                ...state,
                selectedLocation: action.selectedLocation
            }
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