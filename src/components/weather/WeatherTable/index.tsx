import React from "react";
import Paper from "../../atoms/Paper";
import WeatherCell from "../WeatherCell";
import { Divider, Typography } from "antd";
import TimeCell from "../TimeCell";
import { IForecast, IWeather } from "../../../weather/types";
import './style.css';
import { ITableData } from "./types";

interface IWeatherTableListProps {
    tableData: ITableData,
    name: string,
    justifyRight: boolean,
}

class WeatherTable extends React.Component<IWeatherTableListProps> {
    public render() {
        return (
            <div>
                {this.props.name}
                <div className="columns">

                    {/* Time row background */}
                    <div className="right-column">
                        <div className="time-row" style={{ width: '100%' }}>
                            <Paper style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>

                    {/* Weather row background. One for each provider. */}
                    <div className="all-columns">
                        <div className="time-row" />
                        {this.props.tableData.providers.map((ignored, index) =>
                            <div key={index} className="weather-row">
                                <Paper style={{ width: '100%', height: '100%' }} />
                            </div>
                        )}
                    </div>

                    {/* Provider Name */}
                    <div className="left-column">
                        <div className="time-row" />
                        {this.props.tableData.providers.map((provider, index) =>
                            <div key={index} className="weather-row">
                                <Typography className="weather-provider-name">
                                    {provider.name}
                                </Typography>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="divider-column">
                        <div className="time-row" />
                        {this.props.tableData.providers.map((ignored, index) =>
                            <div key={index} className="weather-row">
                                <Divider type="vertical" style={{ height: 'calc(100% - 5px)', margin: 0 }} />
                            </div>
                        )}
                    </div>

                    {/* Time cells and Weather cells */}
                    <div className="right-column" style={{ overflowX: 'auto' }}>
                        <div className="time-row" style={{justifyContent: this.props.justifyRight ? "flex-end" : "space-around"}}>
                            {this.props.tableData.columns.map((column, index) =>
                                <TimeCell key={index} time={column.date} />
                            )}
                        </div>
                        {this.props.tableData.providers.map((provider, index) =>
                            <div key={index} className="weather-row" style={{justifyContent: this.props.justifyRight ? "flex-end" : "space-around"}}>
                                {this.props.tableData.columns.map((column, index) =>
                                    <WeatherCell key={index} weather={column.weatherMap.get(provider) as IWeather} />
                                )}
                            </div>
                        )}
                    </div>
                </div >
            </div>
        );
    }
}

export default WeatherTable;