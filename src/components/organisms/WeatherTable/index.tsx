import React from "react";
import { IForecast, ITimePoint } from "../../../store/types";
import Paper from "../../atoms/Paper";
import WeatherCell from "../../molecules/WeatherCell";
import { Divider } from "antd";
import TimeCell from "../../molecules/TimeCell";

import './style.css';

interface WeatherTableProps {
    targetTimes: Date[],
    forecasts: IForecast[],
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
                    {this.props.forecasts.map(forecast =>
                        <div className="weather-row">
                            <Paper style={{ width: '100%', height: '100%' }} />
                        </div>
                    )}
                </div>

                <div className="left-column">
                    <div className="time-row" />
                    {this.props.forecasts.map(forecast =>
                        <div className="weather-row">
                            <div>
                                <img className="weather-provider-logo" src={forecast.weatherProvider.logo} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="divider-column">
                    <div className="time-row" />
                    {this.props.forecasts.map(forecast =>
                        <div className="weather-row">
                            <Divider type="vertical" style={{ height: 'calc(100% - 5px)', margin: 0 }} />
                        </div>
                    )}
                </div>

                <div className="right-column" style={{overflowX: 'auto'}}>
                    <div className="time-row">
                        {this.props.targetTimes.map(time =>
                            <TimeCell time={time} />
                        )}
                    </div>
                    {this.props.forecasts.map(forecast =>
                        <div className="weather-row">
                            {getWeatherAtTimes(forecast.times, this.props.targetTimes).map(timePoint =>
                                <WeatherCell weather={timePoint.weather} />
                            )}
                        </div>
                    )}
                </div>
            </div >
        );
    }
}

function getWeatherAtTimes(timePoints: ITimePoint[], targetTimes: Date[]): ITimePoint[] {
    let temp: ITimePoint[] = [];

    targetTimes.forEach(time => {
        for (let i = 0; i < timePoints.length; i++) {
            if (time.getTime() === timePoints[i].time.getTime()) {
                temp.push(timePoints[i])
                break;
            }
        }
    });

    return temp;
}

export default WeatherTable;