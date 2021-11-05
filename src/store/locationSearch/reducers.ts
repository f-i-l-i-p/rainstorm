import { selectLocation } from "./actions";
import { GEOCODE_FAILURE, GEOCODE_START, GEOCODE_SUCCESS, ILocationSearchState, LOCATE_USER_FAILURE, LOCATE_USER_START, LOCATE_USER_SUCCESS, LocationActionTypes, SELECT_LOCATION, SELECT_USER_LOCATION } from "./types";

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
                selectedLocation: action.location,
            };
        case SELECT_USER_LOCATION:
            console.log("ldakfjaldkfjalkdsfjaldskfj");
            console.log(state);
            return {
                ...state,
                selectedLocation: state.userLocation,
            }
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
        case LOCATE_USER_START:
            return {
                ...state,
                userLocationIsLoading: true,
            }
        case LOCATE_USER_SUCCESS:
            return {
                ...state,
                userLocationIsLoading: false,
                userLocation: action.location,
            }
        case LOCATE_USER_FAILURE:
            return {
                ...state,
                userLocationIsLoading: false,
                userLocationErrorMessage: action.errorMessage,
            }

        default:
            return state;
    }
}