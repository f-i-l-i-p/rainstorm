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

    // TODO: handle search failure

    
    // const result = await fetch('https://geocode.xyz/' + searchTerm + '?json=1');

    // if (result.ok) {
    //     const locations = toILocations(await result.json());
    //     dispatch(searchSuccess(locations))
    // }
    // else {
    //     console.error('Geocode response error! status: ' + result.statusText);
    //     dispatch(searchFailure(result.status.toString()));
    // }

    fetch('https://geocode.xyz/' + searchTerm + '?json=1')
        .then(res => res.json())
        .then(json => {
            dispatch(searchSuccess(toILocations(json)));
        })
}

// Converts JSON data from geocode.xyz to an ILocation array
function toILocations(json: any): ILocation[] {
    if (json['error'])
        return [];

    try {
        let loc = json['alt']['loc'];

        let location: ILocation = {
            country: loc['countryname'],
            name: loc['city'],
            lat: Number(loc['latt']),
            long: Number(loc['longt']),
            alt: 0,
        }
        return [location];
    }
    catch (error) {
        console.error(error.message)
        return []
    }
}