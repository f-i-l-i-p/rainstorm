import React  from "react";
import WeatherView from "../templates/WeatherView";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { IForecast, ILocation } from "../../store/types";
import { setDisplayTimes } from "../../store/forecasts/actions";

interface IWeatherPageProps {
    location?: ILocation,
    displayTimes: Date[],
    displayForecasts: IForecast[],
    setDisplayTimes: (times: Date[]) => void,
}

interface IWeatherPageState {
}

class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    render() {
        return (
            <WeatherView times={this.props.displayTimes} forecasts={this.props.displayForecasts} location={this.props.location}/>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        location: state.locationSearch.selectedLocation,
        displayForecasts : state.forecasts.displayForecasts,
        displayTimes: state.forecasts.displayTimes
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        setDisplayTimes: (time: Date[]) => dispatch(setDisplayTimes(time)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);