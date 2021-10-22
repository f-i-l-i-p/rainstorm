import React from "react";
import { connect } from "react-redux";
import { selectLocation } from "../../../store/locationSearch/actions";
import { ILocation } from "../../../store/types";
import { AppState } from "../../../store";
import LocationSearchItem from "../LocationSearchItem";
import { Divider } from "antd";
import { fetchForecasts } from "../../../store/forecasts/actions";

interface ILocationSearchListProps {
    selectLocation: (location: ILocation) => void,
    fetchForecasts: (location: ILocation) => void,
    locationResults: ILocation[],
    onSelect: () => void,
}

class LocationSearchList extends React.Component<ILocationSearchListProps>{

    private onLocationSelect(location: ILocation): void {
        this.props.selectLocation(location);
        this.props.fetchForecasts(location);
        this.props.onSelect();
    }

    render() {
        return (
            <div style={{overflow: "scroll"}}>
                {this.props.locationResults.map((location, index) =>
                    <React.Fragment key={index}>
                        <LocationSearchItem location={location} onSelect={location => this.onLocationSelect(location)} />
                        <Divider style={{margin: 0}} />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        locationResults: state.locationSearch.searchResults,
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        selectLocation: (location: ILocation) => dispatch(selectLocation(location)),
        fetchForecasts: (location: ILocation) => dispatch(fetchForecasts(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearchList);