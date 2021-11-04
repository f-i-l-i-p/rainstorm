import { GEOCODE_FAILURE, GEOCODE_START, GEOCODE_SUCCESS, ILocationSearchState, LocationActionTypes, SELECT_LOCATION } from "./types";

const initialState: ILocationSearchState = {
    selectedLocation: undefined,
    geocodeResults: [],
    geocodeIsLoading: false,
    geocodeErrorMessage: '',
    userLocation: undefined,
    userLocationIsLoading: false,
    userLocationErrorMessage: '',
}

export function locationSearchReducer(state = initialState, action: LocationActionTypes): ILocationSearchState {
    switch (action.type) {
        case SELECT_LOCATION:
            return {
                ...state,
                selectedLocation: action.selectedLocation
            };
        case GEOCODE_START:
            return {
                ...state,
                geocodeIsLoading: true
            };
        case GEOCODE_SUCCESS:
            return {
                ...state,
                geocodeIsLoading: false,
                geocodeResults: action.results,
                geocodeErrorMessage: "",
            }
        case GEOCODE_FAILURE:
            return {
                ...state,
                geocodeIsLoading: false,
                geocodeResults: [],
                geocodeErrorMessage: action.errorMessage
            };
        default:
            return state;
    }
}