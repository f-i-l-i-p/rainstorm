import React from "react";
import Paper from "../../atoms/Paper";
import WeatherCell from "../../molecules/WeatherCell";
import { Divider, Typography } from "antd";
import TimeCell from "../../molecules/TimeCell";
import { IForecast, IWeather, IWeatherProvider } from "../../../weather/types";

import './style.css';
import { IWeatherStateForecast } from "../../../store/forecasts/types";

interface WeatherTableProps {
    displayTimes: Date[],
    weatherStateForecasts: IWeatherStateForecast[],
}

class WeatherTable extends React.Component<WeatherTableProps> {
    /**
     * Extracts all weather points that should be shown in this weather table.
     * @returns A list with IWeather, sorted by its corresponding date.
     */
    private getWeatherPoints(forecast: IForecast): IWeather[] {
        let weatherPoints: IWeather[] = [];

        // TODO: INEFFICIENT, FIX THIS!
        // The Weather table should get this from parent component.
        this.props.displayTimes.forEach(displayTime => {
            forecast.weatherPoints.forEach((weather, date) => {
                if (date.getTime() === displayTime.getTime()) {
                    weatherPoints.push(weather);
                }
            });
        });

        return weatherPoints;
    }

    public render() {
        return (
            <div className="columns">

                <div className="right-column">
                    <div className="time-row" style={{ width: '100%' }}>
                        <Paper style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>

                {/* Weather row background */}
                <div className="all-columns">
                    <div className="time-row" />
                    {this.props.weatherStateForecasts.map(() =>
                        <div className="weather-row">
                            <Paper style={{ width: '100%', height: '100%' }} />
                        </div>
                    )}
                </div>

                {/* Provider Name */}
                <div className="left-column">
                    <div className="time-row" />
                    {this.props.weatherStateForecasts.map(weatherStateForecast =>
                        <div className="weather-row">
                            <Typography className="weather-provider-name">
                                {weatherStateForecast.weatherProvider.name}
                            </Typography>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="divider-column">
                    <div className="time-row" />
                    {this.props.weatherStateForecasts.map(() =>
                        <div className="weather-row">
                            <Divider type="vertical" style={{ height: 'calc(100% - 5px)', margin: 0 }} />
                        </div>
                    )}
                </div>

                {/* Time cells and Weather cells */}
                <div className="right-column" style={{ overflowX: 'auto' }}>
                    <div className="time-row">
                        {this.props.displayTimes.map(time =>
                            <TimeCell time={time} />
                        )}
                    </div>
                    {this.props.weatherStateForecasts.map(weatherStateForecast =>
                        <div className="weather-row">
                            {this.getWeatherPoints(weatherStateForecast.forecast).map(weather =>
                                <WeatherCell weather={weather} />
                            )}
                        </div>
                    )}
                </div>
            </div >
        );
    }
}

export default WeatherTable;