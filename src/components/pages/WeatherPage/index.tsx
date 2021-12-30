import React from "react";
import WeatherTableList from "../../weather/WeatherTableList";
import LocationSearch from "../../location/LocationSearch";
import { Button, Spin, Typography } from 'antd';
import { SearchOutlined, StopOutlined, SettingOutlined, EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import './style.css';
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { ILocation } from "../../../location/types";
import SettingsPage from "../SettingsPage";
import { fetchForecasts } from "../../../store/forecasts/actions";
import { updateSystemTheme } from "../../../store/settings/actions";
import { ThemeTypes } from "../../../store/settings/types";
import SunTimes from "../../weather/SunTimes";
import { startGeolocate } from "../../../location/geolocation";
import { selectLocation } from "../../../store/locationSearch/actions";

const { Title } = Typography;

interface IWeatherPageProps {
    selectedLocation: ILocation,
    weatherIsLoading: boolean,
    fetchForecasts: (location: ILocation) => void,
    updateSystemTheme: (systemTheme: ThemeTypes) => void,
    selectLocation: (Location: ILocation) => void,
}

interface IWeatherPageState {
    showLocationSearch: boolean,
    showSettingsPage: boolean,
    userLocationLoading: boolean,
    userLocationError: boolean,
}

class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    constructor(props: Readonly<IWeatherPageProps>) {
        super(props)

        this.state = {
            showLocationSearch: false,
            showSettingsPage: false,
            userLocationLoading: false,
            userLocationError: false,
        }
    }

    componentDidMount() {
        // Find user position, select it as location, and fetch the forecast
        this.props.fetchForecasts(this.props.selectedLocation);

        // React on system theme change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const theme = e.matches ? "dark" : "light";
            this.props.updateSystemTheme(theme);
        });
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

    private openSettingsSearch() {
        this.setState({
            showSettingsPage: true,
        })
    }

    private closeSettingsSearch() {
        this.setState({
            showSettingsPage: false,
        });
    }

    private geolocate() {
        this.setState({
            ...this.state,
            userLocationLoading: true,
        })

        const updateState = (isError: boolean) => {
            this.setState({
                ...this.state,
                userLocationLoading: false,
                userLocationError: isError,
            })
        }
        startGeolocate({
            onSuccess: (location: ILocation) => {
                this.props.selectLocation(location);
                this.props.fetchForecasts(location);
                updateState(false)
            },
            onError: () => {
                updateState(true)
            }
        })
    }

    private getGeolocateIcon() {
        if (this.state.userLocationLoading) {
            return (<LoadingOutlined />)
        }
        else if (this.state.userLocationError) {
            return (<StopOutlined />)
        } else {
            return (<EnvironmentOutlined />)
        }
    }


    render() {
        return (
            <React.Fragment>

                <div className="weather-page" style={{ height: 0, overflow: (this.state.showLocationSearch || this.state.showSettingsPage) ? 'hidden' : 'unset' }}>
                    <div className="button-container">
                        <Button className="settings-button" ghost icon={<SettingOutlined />} shape="circle" size="large" onClick={() => this.openSettingsSearch()} />
                        <div>
                            <Button className="user-location-button" ghost icon={this.getGeolocateIcon()} shape="circle" size="large" onClick={() => this.geolocate()} />
                            <Button className="search-location-button" ghost icon={<SearchOutlined />} shape="circle" size="large" onClick={() => this.openLocationSearch()} />
                        </div>
                    </div>
                    <Title className="title" style={{ fontWeight: 1, fontSize: 50 }}>{this.props.selectedLocation?.name}</Title>

                    {this.props.weatherIsLoading ?
                        <Spin className="spin" size="large" />
                        :
                        <React.Fragment>
                            <SunTimes />
                            <WeatherTableList />
                        </React.Fragment>
                    }
                </div>

                {this.state.showLocationSearch &&
                    <LocationSearch close={() => this.closeLocationSearch()} />
                }

                {this.state.showSettingsPage &&
                    <SettingsPage close={() => this.closeSettingsSearch()} />
                }

            </React.Fragment>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        selectedLocation: state.locationSearch.selectedLocation,
        weatherIsLoading: state.forecasts.isLoading,
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        fetchForecasts: (location: ILocation) => dispatch(fetchForecasts(location)),
        updateSystemTheme: (systemTheme: ThemeTypes) => dispatch(updateSystemTheme(systemTheme)),
        selectLocation: (location: ILocation) => dispatch(selectLocation(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
