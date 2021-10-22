import React from "react";
import WeatherTableList from "../../weather/WeatherTableList";
import LocationSearch from "../../location/LocationSearch";
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';


interface IWeatherPageProps {
}

interface IWeatherPageState {
    showLocationSearch: boolean,
}

export default class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    constructor(props: Readonly<IWeatherPageProps>) {
        super(props)

        this.state = {
            showLocationSearch: false,
        }
    }

    private openLocationSearch() {
        this.setState({
            showLocationSearch: true,
        })
    }

    private closeLocationSearch() {
        this.setState({
            showLocationSearch: false,
        });
    }

    render() {
        return (
            <React.Fragment>
                {/* Background */}
                <div id="background"/>
                
                {/* Content */}
                {this.state.showLocationSearch ?
                    <LocationSearch close={() => this.closeLocationSearch()} />
                    :
                    <div className="weather-page">
                        <Button ghost style={{ right: 0 }} icon={<SearchOutlined />} shape="circle" size="large" onClick={() => this.openLocationSearch()} />
                        <WeatherTableList />
                    </div>
                }
            </React.Fragment>
        );
    }
}
