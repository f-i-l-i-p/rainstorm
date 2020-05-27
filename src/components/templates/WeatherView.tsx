import React, { Fragment } from "react";
import { IForecast, IWeather } from "../../store/types";
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
    // TODO: move to store
    currentWeather(): IWeather {
        let totalTemp = 0;
        let totalData = 0;
        this.props.forecasts.forEach(forecast => {
            if (forecast.times.length > 0){
                // So apparently the temperature think that it is a string or something and this
                // wont work without converting it to a number.
                totalTemp = totalTemp + +forecast.times[0].weather.temperature;
                totalData++;
            }
        });
        // TODO: return average weather
        return {
            temperature: totalTemp / totalData,
            wind: NaN,
            gust: NaN,
            symbol: '',
        }
    }

    public render() {
        return (
            <div>
                {this.props.location &&
                    <CurrentWeather location={this.props.location} weather={this.currentWeather()}/>
                }
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