import { deleteCookie, getCookie, setCookie } from "../../helpers/cookies";
import { geocodeCoordinates } from "../../location/geolocation";
import { ILocation } from "../../location/types";
import { GEOCODE_FAILURE, GEOCODE_START, GEOCODE_SUCCESS, ILocationSearchState, LocationActionTypes, SELECT_LOCATION } from "./types";

const initialState = createInitialState();
const MAX_HISTORY_LENGTH = 5;

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
}

function loadHistory(): ILocation[] {
    const json = getCookie("weather-locations");

    if (json !== null) {
        try {
            let history: ILocation[] = JSON.parse(json);
            return history;
        } catch { }
    }

    // TODO: This if statement is temporary. Delete in future.
    // If no weather locations found. Check the old cookie.
    if (json === null) {
        return convertOldCookie();
    }

    return [];
}

// TODO: convertOldCookie is temporary. Delete in future.
/**
 * Checks if the old cookie is remaining. If so, delete it
 * and save in the new format. Also return saved weather as
 * history.
 */
function convertOldCookie(): ILocation[] {
    const json = getCookie("weather-location");

    if (json !== null) {
        try {
            let location: ILocation = JSON.parse(json);

            const coords: GeolocationCoordinates = {
                accuracy: 1,
                altitude: location.alt,
                altitudeAccuracy: 1,
                heading: 1,
                latitude: location.lat,
                longitude: location.long,
                speed: 1,
            }

            geocodeCoordinates(coords, {
                onSuccess: (location: ILocation) => {
                    saveHistory([location]);
                    deleteCookie("weather-location");
                }, onError: () => { }
            })

            return [location];

        } catch { }
    }

    return [];
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

function createInitialState(): ILocationSearchState {
    const history = loadHistory();

    let selectedLocation: ILocation;
    if (history.length > 0) {
        selectedLocation = history[0];
    } else {
        selectedLocation = getDefaultLocation();
    }

    return {
        selectedLocation: selectedLocation,
        locationHistory: history,
        geocodeResults: [],
        geocodeIsLoading: false,
        geocodeErrorMessage: '',
    }
}