import React from "react";
import { IForecast, ITimePoint } from "../../../store/types";
import Paper from "../../atoms/Paper";
import WeatherCell from "../../molecules/WeatherCell";
import { Divider } from "antd";
import TimeCell from "../../molecules/TimeCell";

import './style.css';

interface WeatherTableProps {
    displayTimes: Date[],
    displayForecasts: IForecast[],
}

class WeatherTable extends React.Component<WeatherTableProps> {
    public render() {
        return (
            <div className="columns">

                <div className="right-column">
                    <div className="time-row" style={{width: '100%'}}>
                        <Paper style={{width: '100%', height: '100%'}}/>
                    </div>
                </div>

                <div className="all-columns">
                    <div className="time-row" />
                    {this.props.displayForecasts.map(forecast =>
                        <div className="weather-row">
                            <Paper style={{ width: '100%', height: '100%' }} />
                        </div>
                    )}
                </div>

                <div className="left-column">
                    <div className="time-row" />
                    {this.props.displayForecasts.map(forecast =>
                        <div className="weather-row">
                            <div>
                                <img className="weather-provider-logo" src={forecast.weatherProvider.logo} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="divider-column">
                    <div className="time-row" />
                    {this.props.displayForecasts.map(forecast =>
                        <div className="weather-row">
                            <Divider type="vertical" style={{ height: 'calc(100% - 5px)', margin: 0 }} />
                        </div>
                    )}
                </div>

                <div className="right-column" style={{overflowX: 'auto'}}>
                    <div className="time-row">
                        {this.props.displayTimes.map(time =>
                            <TimeCell time={time} />
                        )}
                    </div>
                    {this.props.displayForecasts.map(forecast =>
                        <div className="weather-row">
                            {forecast.times.map(timePoint =>
                                <WeatherCell weather={timePoint.weather} />
                            )}
                        </div>
                    )}
                </div>
            </div >
        );
    }
}

export default WeatherTable;