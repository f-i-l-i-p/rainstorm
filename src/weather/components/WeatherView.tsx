import React, { StrictMode, Fragment } from "react";
import collectWeatherData from "../../store/weather/search";
import { IForecast, ITimePoint, IWeather } from "../../store/weather/types";
import { findByLabelText } from "@testing-library/react";
import { Paper, Grid } from "@material-ui/core";
import createTable from "./WeatherTable";

interface IWeatherViewProps {
}

interface IWeatherViewState {
    times: Date[],
    forecasts: IForecast[],
}

class WeatherView extends React.Component<IWeatherViewProps, IWeatherViewState> {
    constructor(props: Readonly<IWeatherViewState>) {
        super(props);

        this.state = {
            times: this.getTimes(5, 1000 * 60 * 60),
            forecasts: [],
        }
    }

    componentDidMount() {
        this.updateWeather('59.611366', '16.545025')
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
                {/* {this.state.times.map(time => renderTimePoints(time, this.state.Forecasts))}
                {RenderedWeather(this.state.times, this.state.Forecasts)} */}
                {createTable(this.state.times, this.state.forecasts)}
            </ div>
        );
    }
}


export default WeatherView;