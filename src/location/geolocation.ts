
import { ILocation, IUserPositionListener } from "./types";

/**
 * Tries to find the users position and returns it to the listener.
 */
export function startGeolocate(listener: IUserPositionListener) {
    const successCallback: PositionCallback = (position) => geocodeCoordinates(position.coords, listener);

    const errorCallback: PositionErrorCallback = (error) => {
        const coords: GeolocationCoordinates = {
            altitude: 10,
            altitudeAccuracy: 0,
            latitude: 59.33066,
            longitude: 18.06855,
            accuracy: 0,
            heading: null,
            speed: 0,
        };
        geocodeCoordinates(coords, listener);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

/**
 * Converts coordinates to a location
 */
async function geocodeCoordinates(coordinates: GeolocationCoordinates, listener: IUserPositionListener) {
    const response = await fetchReverseGeocode(coordinates.latitude, coordinates.longitude);

    if (!response.ok) {
        listener.onError();
        return;
    }

    const json = await response.json();

    let data = formatData(json);
    // Geocoder does not have altitude so use user position.
    data.alt = coordinates.altitude || NaN;

    listener.onSuccess(data)
}

/**
 * Fetches data from reverse geocoding api.
 */
async function fetchReverseGeocode(latitude: number, longitude: number): Promise<Response> {
    const key = process.env.REACT_APP_LOCATIONIQ;
    const address = "https://eu1.locationiq.com/v1/reverse.php";

    return fetch(`${address}?key=${key}&lat=${latitude}&lon=${longitude}&format=json&accept-language=sv`);
}

/**
 * Formats the json data from the reverse geocoding api.
 */
function formatData(json: any): ILocation {
    return {
        country: json.display_name,
        name: json.address.city || json.address.municipality || json.address.county || json.address.country,
        lat: json.lat,
        long: json.lon,
        alt: NaN,
    }
}
