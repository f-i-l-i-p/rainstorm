import React from "react";
import { IWeather } from "../../../store/types";
import { Typography } from "antd";

import './style.css';

const { Text } = Typography;

interface Props {
    weather: IWeather
}

const WeatherCell = (props: Props) => (
    <div className="weather_cell">
        <Text strong>{props.weather.temperature} °C</Text>
        {props.weather.symbol &&
            <img className='weather_symbol' src={require("../../../icons/weather symbols/day_" + props.weather.symbol + ".svg")} />
        }
        <div>
            <Text strong>{props.weather.wind}</Text>
            <Text type="secondary"> ({props.weather.gust}) </Text>
            <Text strong>m/s</Text>
        </div>
        {/* <Text strong>{props.weather.symbol}</Text> */}
    </div>
);

export default WeatherCell;