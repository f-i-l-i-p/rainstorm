import { LocationSearchActionTypes, SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILURE, SELECT_LOCATION, UPDATE_USER_LOCATION } from './types';
import { Dispatch } from 'redux';
import { ILocation } from '../types';


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
    dispatch(searchStart());

    const key = process.env.REACT_APP_LOCATIONIQ;
    const result = await fetch('https://eu1.locationiq.com/v1/search.php?key=' + key + '&q=' + searchTerm + '&format=json');

    if (result.ok) {
        const locations = toILocations(await result.json());
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
                country: loc['display_name'],
                name: loc['display_name'].split(',')[0],
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
