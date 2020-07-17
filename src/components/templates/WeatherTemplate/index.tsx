import React from "react";
import { IForecast } from "../../../store/types";
import { ILocation } from "../../../store/types";
import WeatherTable from "../../organisms/WeatherTable";
import ToggleButton from "../../atoms/ToggleButton";
import { Typography } from "antd";

import './style.css';

const { Title } = Typography;

interface IDisplayMode {
    title: string,
    activate: any,
}

interface IWeatherViewProps {
    location?: ILocation,
    displayTimes: Date[],
    displayForecasts: IForecast[],
    displayModes: IDisplayMode[],
}

const WeatherView = (props: IWeatherViewProps) => (
    <div id="weather-template-container">
        <div className="row">
            {props.location &&
                <Title level={2}>{props.location.name}</Title>
            }
            <ToggleButton
                className="row-end-item"
                type="primary"
                shape="round"
                options={props.displayModes.map(mode => { return { title: mode.title, onClick: mode.activate } })}
            />
        </div>
        <WeatherTable displayTimes={props.displayTimes} displayForecasts={props.displayForecasts} />
    </ div>
)

export default WeatherView;