import React from "react";
import Paper from "../../atoms/Paper";
import WeatherCell from "../WeatherCell";
import { Divider, Typography } from "antd";
import TimeCell from "../TimeCell";
import { IWeatherPoint, IWeatherSpan } from "../../../weather/types";
import './style.css';

const { Title } = Typography;

interface IWeatherTableListProps {
    tableData: IWeatherSpan[] | IWeatherPoint[],
    providers: string[],
    name: string,
    justifyRight: boolean, // This is not used and can be removed
}

class WeatherTable extends React.Component<IWeatherTableListProps> {
    public render() {
        return (
            <div>
                <Title level={4}>{this.props.name}</Title>
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
                        {this.props.providers.map((ignored, index) =>
                            <div key={index} className="weather-row">
                                <Paper style={{ width: '100%', height: '100%' }} />
                            </div>
                        )}
                    </div>

                    {/* Provider Name */}
                    <div className="left-column">
                        <div className="time-row" />
                        {this.props.providers.map((provider, index) =>
                            <div key={index} className="weather-row">
                                <Typography className="weather-provider-name">
                                    {provider}
                                </Typography>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="divider-column">
                        <div className="time-row" />
                        {this.props.providers.map((ignored, index) =>
                            <div key={index} className="weather-row">
                                <Divider type="vertical" style={{ height: 'calc(100% - 5px)', margin: 0 }} />
                            </div>
                        )}
                    </div>

                    {/* Time cells and Weather cells */}
                    <div className="right-column" style={{ overflowX: 'auto' }}>
                        <div className="time-row" style={{ justifyContent: this.props.justifyRight ? "flex-end" : "space-around" }}>
                            {this.props.tableData.map((column: any, index) =>
                                <TimeCell key={index} time={formatTime(column)} />
                            )}
                        </div>
                        {this.props.providers.map((provider, index) =>
                            <div key={index} className="weather-row" style={{ justifyContent: this.props.justifyRight ? "flex-end" : "space-around" }}>
                                {this.props.tableData.map((column, index) =>
                                    <WeatherCell key={index} weather={column.weather[provider]} />
                                )}
                            </div>
                        )}
                    </div>
                </div >
            </div>
        );
    }
}

function formatTime(column: IWeatherPoint | IWeatherSpan): string {
    const any: any = column;
    if (any.date) {
        return ('0' + any.date.getHours()).slice(-2);
    }
    else if (any.startDate && any.endDate) {
        return ('0' + any.startDate.getHours()).slice(-2) + "—" + ('0' + any.endDate.getHours()).slice(-2);
    }

    return "";
}

export default WeatherTable;