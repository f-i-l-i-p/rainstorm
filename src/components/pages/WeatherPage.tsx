import React from "react";
import WeatherView from "../weather/WeatherTemplate";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { ILocation } from "../../store/types";
import { setDisplayTimes } from "../../store/forecasts/actions";
import { listHoursFromNow, listDaysFromNow } from "../../helpers/date";
import { IWeatherStateForecast } from "../../store/forecasts/types";
import WeatherTableList from "../weather/WeatherTableList";
import SearchBox from "../atoms/SearchBox";

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
        console.log("Render!!")
        return (
            <div>
                <SearchBox style={{width: "100%"}}/>
                <div style={{height: "50px"}}></div>
                <WeatherTableList weatherStateForecasts={this.props.weatherStateForecasts} />
            </div>
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