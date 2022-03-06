import { deleteCookie, getCookie, setCookie } from "../../helpers/cookies";
import { getUrlLocation, setUrlLocation } from "../../helpers/urlEncode";
import { ILocation } from "../../location/types";
import { GEOCODE_FAILURE, GEOCODE_START, GEOCODE_SUCCESS, ILocationSearchState, LocationActionTypes, SELECT_LOCATION } from "./types";

const initialState = createInitialState();
const MAX_HISTORY_LENGTH = 5;

var deleteOldCookie = false; // TODO: Remove

export function locationSearchReducer(state = initialState, action: LocationActionTypes): ILocationSearchState {
    switch (action.type) {
        case SELECT_LOCATION:
            let history = [...state.locationHistory];

            const index = history.findIndex(e => e.name === action.location.name);
            if (index !== -1) {
                history.splice(index, 1);
            }
            if (history.length >= MAX_HISTORY_LENGTH) {
                history.splice(MAX_HISTORY_LENGTH - 2, history.length - 1);
            }
            history.unshift(action.location);

            saveHistory(history);
            setUrlLocation(action.location)

            return {
                ...state,
                selectedLocation: action.location,
                locationHistory: history,
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

function saveHistory(history: ILocation[]): void {
    const str = JSON.stringify(history);
    setCookie("weather-locations", str, 60 * 60 * 24 * 365);
    deleteCookie("weather-location");
}

function loadHistory(): ILocation[] {
    const json = getCookie("weather-locations");

    if (json !== null) {
        try {
            let history: ILocation[] = JSON.parse(json);
            return history;
        } catch { }
    }

    return [];
}

// TODO: This is temporary. Delete in future.
/**
 * Checks if the old cookie is remaining. If so, return the weather.
 */
function getOldCookie(): ILocation | null {
    const json = getCookie("weather-location");

    if (json !== null) {
        deleteOldCookie = true;
        try {
            let old_location: ILocation = JSON.parse(json);
            return old_location;

        } catch { }
    }

    return null;
}

export function getDefaultLocation(): ILocation {
    return {
        name: "Stockholm",
        country: "Sverige",
        lat: 59.33066,
        long: 18.06855,
        alt: 10,
    }
}

function createInitialState(): ILocationSearchState {
    const history = loadHistory();
    const urlLocation = getUrlLocation()

    let selectedLocation: ILocation;

    if (urlLocation) {
        selectedLocation = {
            name: urlLocation.name,
            country: "",
            lat: urlLocation.lat,
            long: urlLocation.lon,
            alt: 0,
        }
    }
    else if (history.length > 0) {
        selectedLocation = history[0];
    }
    else {
        // TODO: This is temporary. Delete in future.
        // Use old cookie if no history
        const old = getOldCookie();
        selectedLocation = old !== null ? old : getDefaultLocation();
    }

    return {
        selectedLocation: selectedLocation,
        locationHistory: history,
        geocodeResults: [],
        geocodeIsLoading: false,
        geocodeErrorMessage: '',
    }
}