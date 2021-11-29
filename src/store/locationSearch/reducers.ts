import { getCookie, setCookie } from "../../helpers/cookies";
import { ILocation } from "../../location/types";
import { GEOCODE_FAILURE, GEOCODE_START, GEOCODE_SUCCESS, ILocationSearchState, LOCATE_USER_FAILURE, LOCATE_USER_START, LOCATE_USER_SUCCESS, LocationActionTypes, SELECT_LOCATION, SELECT_USER_LOCATION } from "./types";

const initialState: ILocationSearchState = {
    selectedLocation: getInitialLocation(),
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
            saveLocation(action.location);
            return {
                ...state,
                selectedLocation: action.location,
            };
        case SELECT_USER_LOCATION:
            if (!state.userLocation) {
                return { ...state };
            }

            saveLocation(state.userLocation);

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

function saveLocation(location: ILocation): void {
    const str = JSON.stringify(location);
    setCookie("weather-location", str, 60 * 60 * 24 * 365);
}

function getDefaultLocation(): ILocation {
    return {
        name: "Stockholm",
        country: "Sverige",
        lat: 59.33066,
        long: 18.06855,
        alt: 10,
    }
}

function getInitialLocation(): ILocation {
    const json = getCookie("weather-location");

    if (json !== null) {
        try {
            let location: ILocation = JSON.parse(json);
            return location;
        } catch {}
    }

    return getDefaultLocation();
}

