import React, { StrictMode, Fragment } from "react";
import { ILocation } from "../../geocode/types";
import WeatherView from "./WeatherView";


interface IWeatherPageProps {

}

interface IWeatherPageState {
    locations: ILocation[],
}

class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    constructor(props: Readonly<IWeatherPageProps>) {
        super(props);

        this.state = {
            locations: [{
                country: "",
                name: "",
                lat: 59.611366,
                long: 16.545025,
                alt: 0,
            }]
        }
    }

    render() {
        return (
            <div>
                {this.state.locations.map(location => <WeatherView location={location}/>)}
            </div>
        );
    }
}

export default WeatherPage;