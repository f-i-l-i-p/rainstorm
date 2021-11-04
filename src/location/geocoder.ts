import { ILocation, IGeocodeListener } from "./types";

let lastSearch: string;
let lastSearchId: number = 0;

// The minimum delay between requests to the api
const MIN_SEARCH_DELAY: number = 500;


/**
 * Starts a new geocode search. The result will be returned to the listener.
 */
export function startGeocode(searchTerm: string, listener: IGeocodeListener): void {
    const trimmed = searchTerm.trim()
    if (trimmed === lastSearch) {
        return;
    }

    lastSearch = trimmed;

    if (trimmed === "") {
        // Don't do an actual search if there is no search term
        listener.onSuccess([]);
        lastSearchId++;
        return;
    }

    lastSearchId++;
    let newSearchId = lastSearchId;

    setTimeout(() => tryPerformSearch(newSearchId, trimmed, listener), MIN_SEARCH_DELAY);
}


/**
 * Returns true if the given search id is outdated.
 */
function isOutdated(searchId: number): boolean {
    return searchId !== lastSearchId;
}


/**
 * Fetches data from geocode api.
 */
async function fetchGeocodeData(searchTerm: string): Promise<Response> {
    const key = process.env.REACT_APP_LOCATIONIQ;
    const address = "https://api.locationiq.com/v1/autocomplete.php";

    return fetch(`${address}?key=${key}&q=${searchTerm}&viewbox=3,44,32,71&limit=20&dedupe=1&accept-language=sv`);//&accept-language=native');
}


/**
 * Formats the json data from the geocode api.
 */
function formatData(json: any): ILocation[] {
    const locations: ILocation[] = []

    for (const loc of json) {
        locations.push({
            country: loc['display_address'],
            name: loc['display_place'],
            lat: Number(loc['lat']),
            long: Number(loc['lon']),
            alt: 0,
        });
    }

    return locations
}


/**
 * Tries to perform a search, but cancels if the search becomes outdated.
 */
async function tryPerformSearch(searchId: number, searchTerm: string, listener: IGeocodeListener) {
    if (isOutdated(searchId)) {
        return;
    }

    const result = await fetchGeocodeData(searchTerm);

    if (isOutdated(searchId)) {
        return;
    }

    const json = await result.json();

    if (isOutdated(searchId)) {
        return;
    }

    if (result.ok) {
        const locations = formatData(json);
        listener.onSuccess(locations);
    }
    // Returns this with a 404 status when no location found.
    else if ( json['error'] === "Unable to geocode" ) {
        const locations: ILocation[] = [];
        listener.onSuccess(locations);
    }
    else {
        // TODO: Remove console warn
        console.warn('Geocode response error!', result.statusText);
        listener.onAbort();
    }
}
