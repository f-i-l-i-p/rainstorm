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
    if (json['error']) {
        console.log("error");
        return [];
    }

    try {
        let location: ILocation = {
            name: json['alt']['loc']['city'],
            lat: 0,
            long: 0,
            alt: 0,
        }
        console.log('success');
        return [location];
    }
    catch (error) {
        console.error(error.message)
        return []
    }
}