import React from "react";
import { connect } from "react-redux";
import { selectLocation } from "../../../store/locationSearch/actions";
import { AppState } from "../../../store";
import LocationSearchItem from "../LocationSearchItem";
import { Divider } from "antd";
import { fetchForecasts } from "../../../store/forecasts/actions";
import "./style.css";
import { ILocation } from "../../../location/types";

interface ILocationSearchListProps {
    showUserLocation: boolean,
    userLocation?: ILocation,
    selectLocation: (location: ILocation) => void,
    fetchForecasts: (location: ILocation) => void,
    onSelect: () => void,
    locationResults: ILocation[],
    selectedLocation?: ILocation,
}

class LocationSearchList extends React.Component<ILocationSearchListProps>{

    private onLocationSelect(location: ILocation): void {
        // Select location and fetch forecast if it is a new location
        if (location.country !== this.props.selectedLocation?.country) {
            this.props.selectLocation(location);
            this.props.fetchForecasts(location);
        }
        this.props.onSelect();
    }

    render() {
        return (
            <div className="location-list">
                {this.props.showUserLocation && this.props.userLocation &&
                    <React.Fragment>
                        <LocationSearchItem location={this.props.userLocation} onSelect={location => this.onLocationSelect(location)} />
                        <Divider style={{ margin: 0 }} />
                    </React.Fragment>
                }
                {this.props.locationResults.map((location, index) =>
                    <React.Fragment key={index}>
                        <LocationSearchItem location={location} onSelect={location => this.onLocationSelect(location)} />
                        <Divider style={{ margin: 0 }} />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        userLocation: state.locationSearch.userLocation,
        locationResults: state.locationSearch.geocodeResults,
        selectedLocation: state.locationSearch.selectedLocation,
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        selectLocation: (location: ILocation) => dispatch(selectLocation(location)),
        fetchForecasts: (location: ILocation) => dispatch(fetchForecasts(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearchList);