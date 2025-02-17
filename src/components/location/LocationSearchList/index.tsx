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
    selectLocation: (location: ILocation) => void,
    fetchForecasts: (location: ILocation) => void,
    onSelect: () => void,
    showHistory: boolean,
    locationResults: ILocation[],
    locationHistory: ILocation[],
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
        const locations: ILocation[] = this.props.showHistory ? this.props.locationHistory : this.props.locationResults;

        return (
            <div className="location-list">
                {locations.map((location, index) =>
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
        locationResults: state.locationSearch.geocodeResults,
        locationHistory: state.locationSearch.locationHistory,
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