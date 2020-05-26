import React from "react";
import { IWeather } from "../../../store/types";
import { Typography } from "antd";

import './style.css';

const { Text } = Typography;

interface Props {
    weather: IWeather
}

const WeatherCell = (props: Props) => (
    <div className="cell">
        <Text strong>{props.weather.temperature} °C</Text>
        <div>
            <Text strong>{props.weather.wind}</Text>
            <Text type="secondary"> ({props.weather.gust}) </Text>
            <Text strong>m/s</Text>
        </div>
        <Text strong>{props.weather.symbol}</Text>
        <img className='weather_symbol' src={require("../../../icons/weather symbols/4.svg")} />
    </div>
);

export default WeatherCell;