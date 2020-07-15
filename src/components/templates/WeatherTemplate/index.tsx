import React from "react";
import { IForecast, IWeather } from "../../../store/types";
import { ILocation } from "../../../store/types";
import CurrentWeather from "../../molecules/CurrentWeather";
import WeatherTable from "../../organisms/WeatherTable";
import ToggleButton from "../../atoms/ToggleButton";

import './style.css';

interface IDisplayMode {
    title: string,
    activate: any,
}

interface IWeatherViewProps {
    location?: ILocation,
    displayTimes: Date[],
    displayForecasts: IForecast[],
    displayModes: IDisplayMode[],
}

const WeatherView = (props: IWeatherViewProps) => (
    <div id="weather-template-container">
        {props.location &&
            <CurrentWeather location={props.location} weather={currentWeather(props.displayForecasts)} />
        }
        <ToggleButton
            className="weather-time-button"
            type="primary"
            shape="round"
            options={props.displayModes.map(mode => { return { title: mode.title, onClick: mode.activate } })}
        />
        <WeatherTable displayTimes={props.displayTimes} displayForecasts={props.displayForecasts} />
    </ div>
)

// Returns the average temperature from the first temperature of all forecasts
// TODO: move to store
function currentWeather(forecasts: IForecast[]): IWeather {
    let totalTemp = 0;
    let totalData = 0;
    forecasts.forEach(forecast => {
        if (forecast.times.length > 0) {
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

export default WeatherView;