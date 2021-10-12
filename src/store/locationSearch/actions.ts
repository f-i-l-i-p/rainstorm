import { LocationSearchActionTypes, SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILURE, SELECT_LOCATION, UPDATE_USER_LOCATION } from './types';
import { Dispatch } from 'redux';
import { ILocation } from '../types';


const minSearchDelay: number = 1000;
var nextSearchTime: number = Date.now();
var lastSearch: String = ""


export function updateUserLocation(location?: ILocation): LocationSearchActionTypes {
    return {
        type: UPDATE_USER_LOCATION,
        location: location
    }
}

export function selectLocation(location: ILocation): LocationSearchActionTypes {
    return {
        type: SELECT_LOCATION,
        selectedLocation: location
    }
}

function searchStart(): LocationSearchActionTypes {
    return {
        type: SEARCH_START,
    };
}

function searchSuccess(results: ILocation[]): LocationSearchActionTypes {
    return {
        type: SEARCH_SUCCESS,
        results: results
    }
}

function searchFailure(errorMessage: string): LocationSearchActionTypes {
    return {
        type: SEARCH_FAILURE,
        errorMessage: errorMessage
    }
}

export const search = (searchTerm: string) => async (dispatch: Dispatch) => {
    const trimmed = searchTerm.trim()
    if (trimmed === lastSearch) {
        return;
    }

    lastSearch = trimmed;

    dispatch(searchStart());

    nextSearchTime = Date.now() + minSearchDelay;
    setTimeout(() => tryPerformSearch(searchTerm, dispatch), minSearchDelay + 1) // Add 1 for extra marginal
}

/**
 * Tries to perform a search, but cancels if the search time has moved.
 */
function tryPerformSearch(searchTerm: string, dispatch: Dispatch) {
    if (Date.now() < nextSearchTime) {
        return;
    }

    performSearch(searchTerm, dispatch);
}

async function performSearch(searchTerm: string, dispatch: Dispatch) {
    const key = process.env.REACT_APP_LOCATIONIQ;
    const address = "https://api.locationiq.com/v1/autocomplete.php";

    const result = await fetch(`${address}?key=${key}&q=${searchTerm}&accept-language=sv`);//&accept-language=native');

    const json = await result.json();

    if (result.ok) {
        const locations = toILocations(json);
        dispatch(searchSuccess(locations));
    }
    // Returns this with a 404 status when no location found.
    else if ( json['error'] == "Unable to geocode" ) {
        const locations: ILocation[] = [];
        dispatch(searchSuccess(locations))
    }
    else {
        console.error('Geocode response error! status: ' + result.statusText);
        dispatch(searchFailure(result.status.toString()));
    }
}

// Converts JSON data from locationIQ to an ILocation array
function toILocations(json: any): ILocation[] {
    const locations: ILocation[] = []

    try {
        for (const loc of json) {
            locations.push({
                country: loc['display_address'],
                name: loc['display_place'],
                lat: Number(loc['lat']),
                long: Number(loc['lon']),
                alt: 0,
            });
        }

        console.log(locations)
        return locations
    }
    catch (error) {
        console.error(error.message)
        return []
    }
}
