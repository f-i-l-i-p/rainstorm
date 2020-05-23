import { ILocation } from "../store/types";

export interface fetchILocationsResponse {
    status: number,
    locations: ILocation[]
}

export async function fetchILocations(location: string): Promise<fetchILocationsResponse> {
    const result = await fetch('https://geocode.xyz/' + location + '?json=1');

    let locations: ILocation[];

    if (result.ok)
        locations = toILocations(await result.json());
    else{
        console.error('Geocode response error! status: ' + result.status);
        locations = [];
    }

    return {
        status: result.status,
        locations: locations,
    };
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