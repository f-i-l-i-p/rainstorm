import { ILocation } from "../types";

export default function search(str: string): ILocation[] {
    let location: ILocation = {
        name: 'test',
        lat: 0,
        long: 0,
        alt: 0,
    }

    return [location];
}