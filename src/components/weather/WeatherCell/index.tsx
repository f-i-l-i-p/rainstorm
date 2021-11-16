import React from "react";
import { Typography } from "antd";

import './style.css';
import { IWeather } from "../../../weather/types";
import { AppState } from "../../../store";
import { connect } from "react-redux";

const { Text } = Typography;

interface Props {
    weather: IWeather,
    showGust: boolean,
}

const WeatherCell = (props: Props) => (
    <div className="weather_cell">
        {props.weather !== undefined &&
            <React.Fragment>
                <Text strong>{Math.round(props.weather.temperature)} °C</Text>
                {props.weather.symbol &&
                    <img className='weather_symbol' alt="" /* TODO: Add alt prop! */ src={require("../../../icons3/" + props.weather.symbol + ".svg").default} />
                }
                <div>
                    {props.showGust && props.weather.gust ?
                        <React.Fragment>
                            <Text strong type="secondary">{Math.round(props.weather.wind)}</Text>
                            <Text type="secondary" style={{marginLeft: "1px", marginRight: "1px"}}>{"(" + Math.round(props.weather.gust) + ")"}</Text>
                            <Text strong type="secondary">{"m/s"}</Text>
                        </React.Fragment>
                        :
                        <Text type="secondary">{Math.round(props.weather.wind) + " m/s"}</Text>
                    }
                    <br />
                    <Text type="secondary"> {props.weather.precipitation + " " + props.weather.precipitationUnit}</Text>
                </div>
            </React.Fragment>
        }
    </div>
);

function mapStateToProps(state: AppState) {
    return {
        showGust: state.settings.showGust,
    }
}

export default connect(mapStateToProps)(WeatherCell);