import React from "react";
import WeatherTableList from "../../weather/WeatherTableList";
import LocationSearch from "../../location/LocationSearch";
import { Button, Typography } from 'antd';
import { SearchOutlined, SettingOutlined } from '@ant-design/icons';
import './style.css';
import { connect } from "react-redux";
import { requestUserPosition, selectUserLocation } from "../../../store/locationSearch/actions";
import { AppState } from "../../../store";
import { ILocation } from "../../../location/types";
import SettingsPage from "../SettingsPage";
import { fetchForecasts } from "../../../store/forecasts/actions";
import { updateSystemTheme } from "../../../store/settings/actions";
import { ThemeTypes } from "../../../store/settings/types";
import SunTimes from "../../weather/SunTimes";

const { Title } = Typography;

interface IWeatherPageProps {
    selectedLocation: ILocation,
    findUserPosition: (onSuccess?: (location: ILocation) => void) => void,
    selectUserLocation: () => void,
    fetchForecasts: (location: ILocation) => void,
    updateSystemTheme: (systemTheme: ThemeTypes) => void,
}

interface IWeatherPageState {
    showLocationSearch: boolean,
    showSettingsPage: boolean,
}

class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    constructor(props: Readonly<IWeatherPageProps>) {
        super(props)

        this.state = {
            showLocationSearch: false,
            showSettingsPage: false,
        }
    }

    componentDidMount() {
        // Find user position, select it as location, and fetch the forecast
        this.props.fetchForecasts(this.props.selectedLocation);

        this.props.findUserPosition(location => {
            if (location.name !== this.props.selectedLocation.name) {
                this.props.fetchForecasts(location);
                this.props.selectUserLocation();
            }
        });

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


    render() {
        return (
            <React.Fragment>

                <div className="weather-page" style={{ height: 0, overflow: (this.state.showLocationSearch || this.state.showSettingsPage) ? 'hidden' : 'unset' }}>
                    <div className="button-container">
                        <Button className="settings-button" ghost icon={<SettingOutlined />} shape="circle" size="large" onClick={() => this.openSettingsSearch()} />
                        <Button className="search-location-button" ghost icon={<SearchOutlined />} shape="circle" size="large" onClick={() => this.openLocationSearch()} />
                    </div>
                    <Title className="title" style={{ fontWeight: 1, fontSize: 50 }}>{this.props.selectedLocation?.name}</Title>
                    <SunTimes />
                    <WeatherTableList />
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
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        findUserPosition: (onSuccess: any) => dispatch(requestUserPosition(onSuccess)),
        selectUserLocation: () => dispatch(selectUserLocation()),
        fetchForecasts: (location: ILocation) => dispatch(fetchForecasts(location)),
        updateSystemTheme: (systemTheme: ThemeTypes) => dispatch(updateSystemTheme(systemTheme)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
