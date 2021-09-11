import React from "react";
import { Typography } from "antd";

import './style.css';
import { IWeather } from "../../../weather/types";

const { Text } = Typography;

interface Props {
    weather: IWeather
}

console.log(require("../../../icons/weather symbols/day_" + "clear_sky" + ".svg"))

const WeatherCell = (props: Props) => (
    <div className="weather_cell">
        <Text strong>{Math.round(props.weather.temperature)} °C</Text>
        {props.weather.symbol &&
            <img className='weather_symbol' src={require("../../../icons/weather symbols/day_" + props.weather.symbol + ".svg").default} />
        }
        <div>
            <Text strong>{Math.round(props.weather.wind)}</Text>
            <Text type="secondary"> ({Math.round(props.weather.gust)}) </Text>
            <Text strong>m/s</Text>
        </div>
        {/* <Text strong>{props.weather.symbol}</Text> */}
    </div>
);


export default WeatherCell;