import { LocationSearchActionTypes, SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILURE, SELECT_LOCATION, UPDATE_USER_LOCATION } from './types';
import { Dispatch } from 'redux';
import { ILocation } from '../types';


const minSearchDelay: number = 500;
var latestSearchId: number = 0;
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

    if (trimmed === "") {
        // Don't do an actual search if there is no search term
        dispatch(searchSuccess([]))
        latestSearchId++;
        return;
    }


    dispatch(searchStart());

    latestSearchId++;
    let newSearchId = latestSearchId;

    setTimeout(() => tryPerformSearch(newSearchId, trimmed, dispatch), minSearchDelay);
}

/**
 * Tries to perform a search, but cancels if the search has an old ID
 */
function tryPerformSearch(searchId: number, searchTerm: string, dispatch: Dispatch) {
    if (searchId !== latestSearchId) {
        return;
    }

    performSearch(searchId, searchTerm, dispatch);
}

async function performSearch(searchId: number, searchTerm: string, dispatch: Dispatch) {
    const key = process.env.REACT_APP_LOCATIONIQ;
    const address = "https://api.locationiq.com/v1/autocomplete.php";

    const result = await fetch(`${address}?key=${key}&q=${searchTerm}&viewbox=3,44,32,71&limit=20&dedupe=1&accept-language=sv`);//&accept-language=native');
    
    // Cancel if this is no longer the latest search
    if (searchId !== latestSearchId) {
        return;
    }

    const json = await result.json();

    // Yes, check again
    if (searchId !== latestSearchId) {
        return;
    }

    if (result.ok) {
        const locations = toILocations(json);
        dispatch(searchSuccess(locations));
    }
    // Returns this with a 404 status when no location found.
    else if ( json['error'] === "Unable to geocode" ) {
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
        console.error(error)
        return []
    }
}
