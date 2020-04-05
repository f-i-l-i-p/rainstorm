import React, { StrictMode, Fragment } from "react";
import collectWeatherData from "../search";
import { IForecast, ITimePoint, IWeather } from "../types";
import WeatherTable from "./WeatherTable";
import { ILocation } from "../../geocode/types";

interface IWeatherViewProps {
    location: ILocation,
    times: Date[],
    forecasts: IForecast[],
}

interface IWeatherViewState {
}

class WeatherView extends React.Component<IWeatherViewProps, IWeatherViewState> {
      public render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
                <WeatherTable targetTimes={this.props.times} forecasts={this.props.forecasts}/>
            </ div>
        );
    }
}


export default WeatherView;