import React from "react";
import Paper from "../../atoms/Paper";
import WeatherCell from "../../molecules/WeatherCell";
import { Divider, Typography } from "antd";
import TimeCell from "../../molecules/TimeCell";
import { IForecast, IWeatherProvider } from "../../../weather/types";

import './style.css';
import { IWeatherStateForecast } from "../../../store/forecasts/types";

interface WeatherTableProps {
    displayTimes: Date[],
    weatherStateForecasts: IWeatherStateForecast[],
}

class WeatherTable extends React.Component<WeatherTableProps> {
    public render() {
        return (
            <div className="columns">

                <div className="right-column">
                    <div className="time-row" style={{ width: '100%' }}>
                        <Paper style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>

                <div className="all-columns">
                    <div className="time-row" />
                    {/*this.props.displayForecasts.map(forecast =>
                        <div className="weather-row">
                            <Paper style={{ width: '100%', height: '100%' }} />
                        </div>
                    )*/}
                </div>

                <div className="left-column">
                    <div className="time-row" />
                    {/*this.props.displayForecasts.map(forecast =>
                        <div className="weather-row">
                            <Typography className="weather-provider-name">
                                {forecast.weatherProvider.name}
                            </Typography>
                        </div>
                    )*/}
                </div>

                <div className="divider-column">
                    <div className="time-row" />
                    {/*this.props.displayForecasts.map(forecast =>
                        <div className="weather-row">
                            <Divider type="vertical" style={{ height: 'calc(100% - 5px)', margin: 0 }} />
                        </div>
                    )*/}
                </div>

                <div className="right-column" style={{ overflowX: 'auto' }}>
                    <div className="time-row">
                        {this.props.displayTimes.map(time =>
                            <TimeCell time={time} />
                        )}
                    </div>
                    {/*this.props.displayForecasts.map(forecast =>
                        <div className="weather-row">
                            {forecast.times.map(timePoint =>
                                <WeatherCell weather={timePoint.weather} />
                            )}
                        </div>
                            )*/}
                </div>
            </div >
        );
    }
}

export default WeatherTable;