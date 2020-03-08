import React, { StrictMode } from "react";
import collectWeatherData from "../../store/weather/search";
import { IForecast, ITimePoint } from "../../store/weather/types";
import { findByLabelText } from "@testing-library/react";

interface IWeatherViewProps {
}

interface IWeatherViewState {
    times: Date[],
    Forecasts: IForecast[],
}

class WeatherView extends React.Component<IWeatherViewProps, IWeatherViewState> {
    constructor(props: Readonly<IWeatherViewState>) {
        super(props);

        this.state = {
            times: this.getTimes(5, 1000 * 60 * 60),
            Forecasts: [],
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
            Forecasts: weather,
        });
    }

    public render() {
        return (
            <div style={{
                backgroundColor: "green",
                display: "flex",
                flexDirection: "row",
            }}>
                {this.state.times.map(time => renderTimePoints(time, this.state.Forecasts))}
            </ div>
        );
    }
}


function renderTimePoints(time: Date, forecasts: IForecast[]): JSX.Element {
    let timePoints: ITimePoint[] = [];

    forecasts.forEach(function (forecast) {
        for (let i = 0; i < forecast.times.length; i++) {
            if (forecast.times[i].time.getTime() === time.getTime()) {
                timePoints.push(forecast.times[i]);
                break;
            }
        }
    });

    return (
        <div style={{
            border: "1px solid red",
            display: "flex",
            flexDirection: "column",
        }}>
            {time.getHours()}
            {timePoints.map(timePoint => renderTimePointWeather(timePoint))}
        </div>
    );
}


function renderTimePointWeather(timePoint: ITimePoint): JSX.Element {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                border: "1px solid gray",
                padding: "1ch 5ch",
                whiteSpace: "nowrap"
            }}>

            <p>{timePoint.weather.temperature}°C</p>
            <p>{timePoint.weather.wind} m/s</p>
            <p>{timePoint.weather.symbol}</p>
        </div>
    );
}


export default WeatherView;