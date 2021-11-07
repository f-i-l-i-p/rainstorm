import React from "react";
import './style.css';
import WeatherTable from "../WeatherTable";
import { Spin, Typography } from "antd";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import { ILocation } from "../../../location/types";
import { IWeatherForecast } from "../../../weather/types";

const { Title } = Typography;

interface IWeatherTableListProps {
    forecast: IWeatherForecast,
    isLoading: boolean,
    selectedLocation?: ILocation,
}

class WeatherTableList extends React.Component<IWeatherTableListProps> {
    private getTableName(index: number, date: Date | undefined): string {
        let result = "";

        if (!date) return result;

        switch (index) {
            case 0:
                result += "Idag, ";
                break;
            case 1:
                result += "Imorgon, "
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
        return (
            <div className="list">
                {this.props.isLoading ?
                    <Spin className="spin" size="large" />
                    :
                    <React.Fragment>
                        <Title className="title">{this.props.selectedLocation?.name}</Title>
                        <div className="items">
                            <WeatherTable tableData={this.props.forecast.hours} providers={this.props.forecast.providers} justifyRight={false} name={this.getTableName(0, this.props.forecast.hours[0].date)} />
                            {this.props.forecast.days.map((weatherDay, index) =>
                                <WeatherTable key={index} tableData={weatherDay.spans} providers={this.props.forecast.providers} justifyRight={false} name={this.getTableName(index + 1, weatherDay.spans[0].startDate)} />
                            )}
                        </div>
                    </React.Fragment>
                }
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
