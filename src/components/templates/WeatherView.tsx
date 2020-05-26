import React, { Fragment } from "react";
import { IForecast } from "../../store/types";
import { ILocation } from "../../store/types";
import { connect } from "react-redux";
import { AppState } from "../../store";
import CurrentWeather from "../molecules/CurrentWeather";
import WeatherTable from "../organisms/WeatherTable";

interface IWeatherViewProps {
    location?: ILocation,
    times: Date[],
    forecasts: IForecast[],
    isLoading: boolean[],
}

interface IWeatherViewState {
}

class WeatherView extends React.Component<IWeatherViewProps, IWeatherViewState> {

    // Returns the average temperature from the first temperature of all forecasts
    currentTemp(): number {
        // TODO: fix this
        // let totalTemp = 0;
        // this.props.forecasts.forEach(forecast => totalTemp += forecast.times[0].weather.temperature)
        // return totalTemp / this.props.forecasts.length;
        return 0;
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
            <div>
                <CurrentWeather location={this.props.location}/>
                <WeatherTable targetTimes={this.props.times} forecasts={this.props.forecasts} isLoading={this.props.isLoading} />
            </ div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        location: state.locationSearch.selectedLocation,
        forecasts: state.forecasts.forecasts,
        isLoading: state.forecasts.isLoading,
    }
}

export default connect(mapStateToProps)(WeatherView);