
export interface ILocation {
    country: string
    name: string
    lat: number
    long: number
    alt: number
}

export interface IForecast {
    weatherProvider: IWeatherProvider,
    times: ITimePoint[]
}

export interface IWeatherProvider {
    name: string,
    logo: string,
}

export interface ITimePoint {
    time: Date,
    weather: IWeather,
}

export interface IWeather {
    temperature: number,
    wind: number,
    symbol: string,
}
