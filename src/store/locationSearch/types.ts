import { ILocation } from "../../location/types";

export interface ILocationSearchState {
    selectedLocation: ILocation,

    geocodeResults: ILocation[],
    geocodeIsLoading: boolean,
    geocodeErrorMessage: string,

    userLocation?: ILocation,
    userLocationIsLoading: boolean,
    userLocationErrorMessage: string,
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

// Locate user

export const LOCATE_USER_START = 'LOCATE_USER_START';

interface ILocateUserStartAction {
    type: typeof LOCATE_USER_START,
}

export const LOCATE_USER_SUCCESS = 'LOCATE_USER_SUCCESS';

interface ILocateUserSuccessAction {
    type: typeof LOCATE_USER_SUCCESS,
    location: ILocation
}

export const LOCATE_USER_FAILURE = 'LOCATE_USER_FAILURE';

interface ILocateUserFailureAction {
    type: typeof LOCATE_USER_FAILURE,
    errorMessage: string
}

// Types

export type LocationActionTypes = ISelectLocationAction | ISelectUserLocation | IGeocodeStartAction | IGeocodeSuccessAction | IGeocodeFailureAction | ILocateUserStartAction | ILocateUserSuccessAction | ILocateUserFailureAction;