import React from "react";
import './style.css';
import { IWeatherStateForecast } from "../../../store/forecasts/types";
import WeatherTable from "../WeatherTable";
import { listHoursFromNow } from "../../../helpers/date";

interface IWeatherTableListProps {
    weatherStateForecasts: IWeatherStateForecast[],
}

interface ITableTimes {
    times: Date[],
}

interface IWeatherTableListState {
    tableTimes: ITableTimes[],
}

export default class WeatherTableList extends React.Component<IWeatherTableListProps, IWeatherTableListState> {
    constructor(props: IWeatherTableListProps)  {
        super(props)

        this.state = {
            tableTimes: [{times: listHoursFromNow(24)}]
        }
    }

    public render() {
        return (
            <div>
                <WeatherTable displayTimes={this.state.tableTimes[0].times} weatherStateForecasts={this.props.weatherStateForecasts} />
                <WeatherTable displayTimes={this.state.tableTimes[0].times} weatherStateForecasts={this.props.weatherStateForecasts} />
            </div>
        );
    }
}
