import { Dispatch } from 'redux';
import { IGeocodeListener, ILocation } from '../../location/types';
import { startGeocode } from '../../location/geocoder';
import { SELECT_LOCATION, LocationActionTypes, GEOCODE_START, GEOCODE_SUCCESS, GEOCODE_FAILURE } from './types';


export function selectLocation(location: ILocation) {
    return {
        type: SELECT_LOCATION,
        location: location,
    }
}

export const geocode = (searchString: string) => async (dispatch: Dispatch) => {
    const onSuccess = (locations: ILocation[]) => dispatch(geocodeSuccess(locations));
    const onFailure = () => dispatch(geocodeFailure("")); // TODO: Error message

    const listener: IGeocodeListener = {
        onSuccess: onSuccess,
        onAbort: onFailure,
    }

    dispatch(geocodeStart());

    startGeocode(searchString, listener);
}

function geocodeStart(): LocationActionTypes {
    return {
        type: GEOCODE_START,
    };
}

function geocodeSuccess(results: ILocation[]): LocationActionTypes {
    return {
        type: GEOCODE_SUCCESS,
        results: results
    }
}

function geocodeFailure(errorMessage: string): LocationActionTypes {
    return {
        type: GEOCODE_FAILURE,
        errorMessage: errorMessage
    }
}
