import React  from "react";
import { ILocation } from "../../geocode/types";
import WeatherView from "./WeatherView";
import { IForecast } from "../types";
import collectWeatherData from "../search";


interface IWeatherPageProps {

}

interface IWeatherPageState {
    location: ILocation,
    times: Date[],
    forecasts: IForecast[],
}

class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    constructor(props: Readonly<IWeatherPageProps>) {
        super(props);

        this.state = {
            location: {
                country: "Country",
                name: "City Name",
                lat: 59.611366,
                long: 16.545025,
                alt: 0,
            },
            times: getTimes(5, 1000 * 60 * 60),
            forecasts: [],
        }
    }

    componentDidMount() {
        this.updateWeather(this.state.location.lat.toString(), this.state.location.long.toString())
    }

    private async updateWeather(lat: string, long: string) {
        const weather = await collectWeatherData(lat, long);

        this.setState({
            ...this.state,
            forecasts: weather,
        });
    }

    render() {
        return (
            <WeatherView location={this.state.location} times={this.state.times} forecasts={this.state.forecasts} />
        );
    }
}

// Returns a list of Date objects with a specified time difference
function getTimes(count: number, interval: number): Date[] {
    let times: Date[] = []

    let start = new Date(Date.now())
    start.setHours(start.getHours() + 1)
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);

    for (let i = 0; i < count; i++) {
        times.push(new Date(start.getTime() + (i * interval)));
    }

    return times;
}

export default WeatherPage;