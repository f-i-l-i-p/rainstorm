import React from "react";
import { Typography } from "antd";

import './style.css';
import { IWeather } from "../../../weather/types";

const { Text } = Typography;

interface Props {
    weather: IWeather
}

const WeatherCell = (props: Props) => (
    <div className="weather_cell">
        {props.weather !== undefined &&
            <React.Fragment>
                <Text strong>{Math.round(props.weather.temperature)} °C</Text>
                {props.weather.symbol &&
                    <img className='weather_symbol' alt="" /* TODO: Add alt prop! */ src={require("../../../icons2/" + props.weather.symbol + ".png").default} />
                }
                <div>
                    <Text type="secondary">{Math.round(props.weather.wind) + " m/s"}</Text>
                    <br/>
                    <Text type="secondary"> {props.weather.precipitation + " " + props.weather.precipitationUnit}</Text>
                </div>
            </React.Fragment>
        }
    </div>
);


export default WeatherCell;