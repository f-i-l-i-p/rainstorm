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
        <p>{props.weather.temperature + "°C"}</p>
    </div>
);

export default CurrentWeather;