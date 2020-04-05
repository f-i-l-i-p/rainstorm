import React, { StrictMode, Fragment } from "react";
import collectWeatherData from "../search";
import { IForecast, ITimePoint, IWeather } from "../types";
import WeatherTable from "./WeatherTable";
import { ILocation } from "../../geocode/types";

interface IWeatherViewProps {
    location: ILocation,
}

interface IWeatherViewState {
    times: Date[],
    forecasts: IForecast[],
}

class WeatherView extends React.Component<IWeatherViewProps, IWeatherViewState> {
    constructor(props: Readonly<IWeatherViewProps>) {
        super(props);

        this.state = {
            times: this.getTimes(5, 1000 * 60 * 60),
            forecasts: [],
        }
    }

    componentDidMount() {
        this.updateWeather(this.props.location.lat.toString(), this.props.location.long.toString())
    }

    private getTimes(count: number, interval: number): Date[] {
        let times: Date[] = []

        let start = new Date(Date.now())
        start.setHours(start.getHours() + 1)
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);

        for (let i = 0; i < count; i++) {
            times.push(new Date(start.getTime() + (i * interval)));
        }

        return times;
    }

    private async updateWeather(lat: string, long: string) {
        const weather = await collectWeatherData(lat, long);

        this.setState({
            ...this.state,
            forecasts: weather,
        });
    }

    public render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
                <WeatherTable targetTimes={this.state.times} forecasts={this.state.forecasts}/>
            </ div>
        );
    }
}


export default WeatherView;