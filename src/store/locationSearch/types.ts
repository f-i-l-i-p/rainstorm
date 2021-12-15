import { ILocation } from "../../location/types";

export interface ILocationSearchState {
    selectedLocation: ILocation,
    locationHistory: ILocation[],

    geocodeResults: ILocation[],
    geocodeIsLoading: boolean,
    geocodeErrorMessage: string,
}

// Select location

export const SELECT_LOCATION = 'SELECT_LOCATION';

interface ISelectLocationAction {
    type: typeof SELECT_LOCATION,
    location: ILocation
}

export const SELECT_USER_LOCATION = "SELECT_USER_LOCATION";

interface ISelectUserLocation {
    type: typeof SELECT_USER_LOCATION,
}

// Geocode

export const GEOCODE_START = 'GEOCODE_START';

interface IGeocodeStartAction {
    type: typeof GEOCODE_START,
}

export const GEOCODE_SUCCESS = 'GEOCODE_SUCCESS';

interface IGeocodeSuccessAction {
    type: typeof GEOCODE_SUCCESS,
    results: ILocation[]
}

export const GEOCODE_FAILURE = 'GEOCODE_FAILURE';

interface IGeocodeFailureAction {
    type: typeof GEOCODE_FAILURE,
    errorMessage: string
}

// Types
export type LocationActionTypes = ISelectLocationAction | ISelectUserLocation | IGeocodeStartAction | IGeocodeSuccessAction | IGeocodeFailureAction;