import React from "react";
import { IForecast, ITimePoint } from "../../../store/types";

import './style.css';
import Paper from "../../atoms/Paper";
import WeatherCell from "../../molecules/WeatherCell";

interface Props {
    targetTimes: Date[],
    forecasts: IForecast[],
    isLoading: boolean[]
}

const WeatherTable = (props: Props) => (
    <div className="table">
        <div className="center-column">
            {props.forecasts.map((forecast, index) =>
                <div className="row">
                    <div className="row column-gap-filler"></div>
                </div>
            )}
        </div>

        <div className="right-column">
            {props.forecasts.map((forecast, index) =>
                <div className="row">
                    <Paper style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                        {getWeatherAtTimes(forecast.times, props.targetTimes).map(timePoint =>
                            <WeatherCell weather={timePoint.weather} />
                        )}
                    </Paper>
                </div>
            )}
        </div>

        <div className="left-column">
            {props.forecasts.map((forecast, index) =>
                <div className="row">
                    <Paper style={{ width: '100%', height: '100%' }}>
                        left
                    </Paper>
                </div>
            )}
        </div>
    </div>
);

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