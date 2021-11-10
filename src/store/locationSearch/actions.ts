import { Dispatch } from 'redux';
import { IGeocodeListener, ILocation, IUserPositionListener as ILocateUserListener } from '../../location/types';
import { startGeocode } from '../../location/geocoder';
import { GEOCODE_FAILURE, GEOCODE_START, GEOCODE_SUCCESS, LOCATE_USER_FAILURE, LOCATE_USER_START, LOCATE_USER_SUCCESS, LocationActionTypes, SELECT_LOCATION, SELECT_USER_LOCATION } from './types';
import { startGeolocate } from '../../location/geolocation';


export function selectLocation(location: ILocation) {
    return {
        type: SELECT_LOCATION,
        location: location,
    }
}

export function selectUserLocation() {
    return {
        type: SELECT_USER_LOCATION,
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

export const requestUserPosition = (callback?: (location: ILocation) => void) => async (dispatch: Dispatch) => {
    const onSuccess = (location: ILocation) => {
        dispatch(locateUserSuccess(location));
        if (callback)
            callback(location);
    };
    const onError = () => dispatch(geocodeFailure("")); // TODO: Error message

    const listener: ILocateUserListener = {
        onSuccess: onSuccess,
        onError: onError,
    }

    dispatch(locateUserStart());

    startGeolocate(listener)
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

function locateUserStart(): LocationActionTypes {
    return {
        type: LOCATE_USER_START,
    };
}

function locateUserSuccess(location: ILocation): LocationActionTypes {
    return {
        type: LOCATE_USER_SUCCESS,
        location: location
    }
}

function locateUserFailure(errorMessage: string): LocationActionTypes {
    return {
        type: LOCATE_USER_FAILURE,
        errorMessage: errorMessage
    }
}