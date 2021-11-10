import React from "react";
import WeatherTableList from "../../weather/WeatherTableList";
import LocationSearch from "../../location/LocationSearch";
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';
import { connect } from "react-redux";
import { requestUserPosition, selectUserLocation } from "../../../store/locationSearch/actions";
import { AppState } from "../../../store";
import { ILocation } from "../../../location/types";
import { fetchForecasts } from "../../../store/forecasts/actions";


interface IWeatherPageProps {
    findUserPosition: (onSuccess?: (location: ILocation) => void) => void,
    selectUserLocation: () => void,
    fetchForecasts: (location: ILocation) => void,
}

interface IWeatherPageState {
    showLocationSearch: boolean,
}

class WeatherPage extends React.Component<IWeatherPageProps, IWeatherPageState>{
    constructor(props: Readonly<IWeatherPageProps>) {
        super(props)

        this.state = {
            showLocationSearch: false,
        }
    }

    componentDidMount() {
        // Find user position, select it as location, and fetch the forecast
        const onSuccess = (location: ILocation) => {
            this.props.selectUserLocation();
            this.props.fetchForecasts(location);
        };
        this.props.findUserPosition(onSuccess);
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
                <div id="background" />

                <div className="weather-page" style={{ height: 0, overflow: this.state.showLocationSearch ? 'hidden' : 'unset' }}>
                    <Button className="search-location-button" ghost icon={<SearchOutlined />} shape="circle" size="large" onClick={() => this.openLocationSearch()} />
                    <WeatherTableList />
                </div>

                {this.state.showLocationSearch &&
                    <LocationSearch close={() => this.closeLocationSearch()} />
                }

            </React.Fragment>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
    }
}


function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        findUserPosition: (onSuccess: any) => dispatch(requestUserPosition(onSuccess)),
        selectUserLocation: () => dispatch(selectUserLocation()),
        fetchForecasts: (location: ILocation) => dispatch(fetchForecasts(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
