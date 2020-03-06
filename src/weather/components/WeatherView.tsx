import React from "react";
import collectWeatherData from "../../store/weather/search";

interface IWeatherViewProps {
}

interface IWeatherViewState {
}

class WeatherView extends React.Component<IWeatherViewProps, IWeatherViewState> {
    constructor(props: Readonly<IWeatherViewState>) {
        super(props);

        this.state = {
        }
    }

    componentDidMount(){
        this.updateWeather('59.611366', '16.545025')
    }

    private async updateWeather(lat: string, long: string) {
        const weather = await collectWeatherData(lat, long);
    }

    public render() {
        return (
            <div>

            </div>
        );
    }
}

export default WeatherView;