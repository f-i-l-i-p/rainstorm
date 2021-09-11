import React from "react";
import WeatherView from "../templates/WeatherTemplate";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { ILocation } from "../../store/types";
import { setDisplayTimes } from "../../store/forecasts/actions";
import { listHoursFromNow, listDaysFromNow } from "../../helpers/date";
import { IForecast, IWeatherProvider } from "../../weather/types";
import { IWeatherStateForecast } from "../../store/forecasts/types";

interface IWeatherPageProps {
    location?: ILocation,
    displayTimes: Date[],
    weatherStateForecasts: IWeatherStateForecast[],
    setDisplayTimes: (times: Date[]) => void,
}

interface IWeatherPageState {
}

class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    render() {
        return (
            <WeatherView
                displayTimes={this.props.displayTimes}
                location={this.props.location}
                weatherStateForecasts={this.props.weatherStateForecasts}
                displayModes={[
                    {
                        title: "7d",
                        activate: () => this.props.setDisplayTimes(listDaysFromNow(7)),
                    }, {
                        title: "24h",
                        activate: () => this.props.setDisplayTimes(listHoursFromNow(24)),
                    },
                ]}
            />
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        location: state.locationSearch.selectedLocation,
        displayTimes: state.forecasts.displayTimes,
        weatherStateForecasts: state.forecasts.weatherStateForecasts,
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        setDisplayTimes: (time: Date[]) => dispatch(setDisplayTimes(time)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);