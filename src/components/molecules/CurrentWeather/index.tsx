import React from "react";
import { ILocation, IWeather } from "../../../store/types";

import './style.css';

interface CurrentWeatherProps {
    location: ILocation,
    weather: IWeather,
}

const CurrentWeather = (props: CurrentWeatherProps) => (
    <div>
        <h1>{props.location.name}</h1>
        <p>{Math.round(props.weather.temperature * 10) / 10 + "°C"}</p>
    </div>
);

export default CurrentWeather;