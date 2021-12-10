import React from "react";
import './style.css';
import WeatherTable from "../WeatherTable";
import { Typography } from "antd";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import { ILocation } from "../../../location/types";
import { IWeatherDay, IWeatherForecast } from "../../../weather/types";

const { Text } = Typography;

interface IWeatherTableListProps {
    forecast: IWeatherForecast,
    isLoading: boolean,
    selectedLocation?: ILocation,
}

class WeatherTableList extends React.Component<IWeatherTableListProps> {
    private getTableName(index: number, date: Date | undefined): string {
        let result = "";

        if (!date) return result;

        if (index === 0) {
            result = "Idag, ";
        } else {
            result = "";
        }

        switch (date.getDay()) {
            case 1:
                result += "Måndag";
                break;
            case 2:
                result += "Tisdag";
                break;
            case 3:
                result += "Onsdag";
                break;
            case 4:
                result += "Torsdag";
                break;
            case 5:
                result += "Fredag";
                break;
            case 6:
                result += "Lördag";
                break;
            case 0:
                result += "Söndag";
                break;
        }

        return result;
    }

    public render() {
        let pairs: IWeatherDay[][] = [];
        for (let i = 0; i < this.props.forecast.days.length - 1; i += 2) {
            pairs.push([this.props.forecast.days[i], this.props.forecast.days[i + 1]]);
        }

        return (
            <div className="list">
                <WeatherTable tableData={this.props.forecast.hours} providers={this.props.forecast.providers} name={this.getTableName(0, this.props.forecast.hours[0].date)} />
                {pairs.map((weatherPair, index) =>
                    <div className="weather-table-pair" key={index}>
                        {weatherPair.map((weatherDay, index2) =>
                            <WeatherTable
                                key={index2}
                                tableData={weatherDay.spans}
                                providers={this.props.forecast.providers}
                                name={this.getTableName(index + index2 + 1, weatherDay.spans[0].startDate)}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}


function mapStateToProps(state: AppState) {
    return {
        forecast: state.forecasts.forecast,
        isLoading: state.forecasts.isLoading,
        selectedLocation: state.locationSearch.selectedLocation,
    }
}

export default connect(mapStateToProps)(WeatherTableList);
