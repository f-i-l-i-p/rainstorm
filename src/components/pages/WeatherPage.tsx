import React  from "react";
import WeatherView from "../templates/WeatherView";

interface IWeatherPageProps {
}

interface IWeatherPageState {
    times: Date[],
}

class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    constructor(props: Readonly<IWeatherPageProps>) {
        super(props);

        this.state = {
            times: getTimes(24, 1000 * 60 * 60),
        }
    }

    render() {
        return (
            <WeatherView times={this.state.times} />
        );
    }
}

// Returns a list of Date objects with a specified time difference
function getTimes(count: number, interval: number): Date[] {
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

export default WeatherPage;