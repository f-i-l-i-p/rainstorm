import { ILocation } from "./types";

export default async function fetchILocations(location: string): Promise<ILocation[]> {
    const result = await fetch('https://geocode.xyz/' + location + '?json=1');

    if (result.ok !== true) {
        console.error('Response error! status: ' + result.status);
        return [];
    }

    return toILocations(await result.json());
}

// Converts JSON data from geocode.xyz to an ILocation array
function toILocations(json: any): ILocation[] {
    if (json['error'])
        return [];

    try {
        var loc = json['alt']['loc'];

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