import React from "react";
import collectWeatherData from "../../store/weather/search";
import { IForecast, ITimePoint } from "../../store/weather/types";

interface IWeatherViewProps {
}

interface IWeatherViewState {
    Forecasts: IForecast[]
}

class WeatherView extends React.Component<IWeatherViewProps, IWeatherViewState> {
    constructor(props: Readonly<IWeatherViewState>) {
        super(props);

        this.state = {
            Forecasts: []
        }
    }

    componentDidMount() {
        this.updateWeather('59.611366', '16.545025')
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
            <div>
                {this.state.Forecasts.map((forecast, index) => (
                    renderForecast(forecast)
                ))}
            </div>
        );
    }
}

function renderForecast(forecast: IForecast): JSX.Element {
    return (
        <div style={{ display: "flex", flexDirection: "row", border: "1px solid red" }}>
            {forecast.times.map(timePoint => (renderTimePointWeather(timePoint)))}
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