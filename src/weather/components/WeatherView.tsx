import React, { Fragment } from "react";
import { IForecast } from "../types";
import WeatherTable from "./WeatherTable";
import { ILocation } from "../../store/types";
import { connect } from "react-redux";
import { AppState } from "../../store";

interface IWeatherViewProps {
    location?: ILocation,
    times: Date[],
    forecasts: IForecast[],
}

interface IWeatherViewState {
}

class WeatherView extends React.Component<IWeatherViewProps, IWeatherViewState> {

    // Returns the average temperature from the first temperature of all forecasts
    currentTemp(): number {
        let totalTemp = 0;
        this.props.forecasts.forEach(forecast => totalTemp += forecast.times[0].weather.temperature)
        return totalTemp / this.props.forecasts.length;
    }

    createHeading(): JSX.Element {
        return (
            <Fragment>
                <h1 style={{ margin: 0 }}>{this.props.location?.name}</h1>
                <p style={{ margin: 0, fontSize: "10ex" }}>{this.currentTemp() + "°C"}</p>
            </Fragment>
        )
    }

    public render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                {this.createHeading()}
                <WeatherTable targetTimes={this.props.times} />
            </ div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        location: state.locationSearch.selectedLocation,
        forecasts: state.forecasts.forecasts,
    }
}

export default connect(mapStateToProps)(WeatherView);