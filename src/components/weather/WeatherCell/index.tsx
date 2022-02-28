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
    showMinMaxTemp: boolean,
}

const WeatherCell = (props: Props) => (
    <div className="weather_cell">
        {props.weather !== undefined &&
            <React.Fragment>
                {isNaN(props.weather.temperature) ?
                    <Text>{" "}</Text>
                    :
                    (props.showMinMaxTemp && !isNaN(props.weather.temperatureMin) && !isNaN(props.weather.temperatureMax)) ?
                        <div>
                            <Text strong className="minimum">{Math.round(props.weather.temperatureMin)}</Text>
                            <Text type="secondary" style={{ marginLeft: "1px", marginRight: "1px" }}>/</Text>
                            <Text strong className="maximum">{Math.round(props.weather.temperatureMax)}</Text>
                            <Text strong> °C</Text>
                        </div>
                        :
                        < Text strong>{Math.round(props.weather.temperature)} °C</Text>
                }
                {props.weather.symbol &&
                    <img className='weather_symbol' alt="" src={require("../../../icons3/" + props.weather.symbol + ".svg")} />
                }
                <div>
                    <div>
                        {isNaN(props.weather.wind) ?
                            <Text>{" "}</Text>
                            :
                            (props.showGust && !isNaN(props.weather.gust)) ?
                                <React.Fragment>
                                    <Text type="secondary">{Math.round(props.weather.wind)}</Text>
                                    <Text className="maximum" type="secondary" style={{ marginLeft: "1px", marginRight: "1px" }}>{"(" + Math.round(props.weather.gust) + ")"}</Text>
                                    <Text type="secondary">{"m/s"}</Text>
                                </React.Fragment>
                                :
                                <Text type="secondary">{Math.round(props.weather.wind)} m/s</Text>
                        }
                    </div>
                    {isNaN(props.weather.precipitation) ?
                        <div>
                            <Text>{" "}</Text>
                        </div>
                        :
                        <Text type="secondary">{props.weather.precipitation + " " + props.weather.precipitationUnit}</Text>
                    }
                </div>
            </React.Fragment>
        }
    </div >
);

function mapStateToProps(state: AppState) {
    return {
        showGust: state.settings.showGust,
        showMinMaxTemp: state.settings.showMinMaxTemp,
    }
}

export default connect(mapStateToProps)(WeatherCell);