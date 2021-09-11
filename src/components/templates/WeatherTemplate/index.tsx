import React from "react";
import { ILocation } from "../../../store/types";
import WeatherTable from "../../organisms/WeatherTable";
import ToggleButton from "../../atoms/ToggleButton";
import { Typography } from "antd";

import './style.css';
import SearchBox from "../../atoms/SearchBox";
import { IForecast, IWeatherProvider } from "../../../weather/types";
import { IWeatherStateForecast } from "../../../store/forecasts/types";

const { Title } = Typography;

interface IDisplayMode {
    title: string,
    activate: any,
}

interface IWeatherViewProps {
    location?: ILocation,
    displayTimes: Date[],
    displayModes: IDisplayMode[],
    weatherStateForecasts: IWeatherStateForecast[],
}

const WeatherView = (props: IWeatherViewProps) => (
    <div id="weather-template-container">
        <SearchBox />
        <div className="row">
            {props.location &&
                <Title level={2}>{props.location.name}</Title>
            }
            <ToggleButton
                type="primary"
                shape="round"
                options={props.displayModes.map(mode => { return { title: mode.title, onClick: mode.activate } })}
            />
        </div>
    <WeatherTable displayTimes={props.displayTimes} weatherStateForecasts={props.weatherStateForecasts}/>
    </ div>
)

export default WeatherView;