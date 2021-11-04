
export interface ILocation {
    country: string
    name: string
    lat: number
    long: number
    alt: number
}

export interface IGeocodeListener {
    onSuccess: (locations: ILocation[]) => void;
    onAbort: () => void;
}

export interface IUserPositionListener {
    onSuccess: (location: ILocation) => void;
    onAbort: () => void;
}
