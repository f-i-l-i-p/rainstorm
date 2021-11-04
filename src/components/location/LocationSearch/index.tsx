import { Button, Input, Spin } from "antd";
import React from "react";
import { connect } from "react-redux";
import { SearchOutlined } from '@ant-design/icons';
import { AppState } from "../../../store";
import LocationSearchList from "../LocationSearchList";
import './style.css';
import { geocode } from "../../../store/locationSearch/actions";

interface ILocationSearchProps {
    searchLocations: (searchTerm: string) => void,
    isLoading: boolean,
    close: () => void,
}

class LocationSearch extends React.Component<ILocationSearchProps>{
    private onChange(text: string) {
        this.props.searchLocations(text);
    }

    render() {
        return (
            <div className="search">
                <div className="search-bar">
                    <Input size="large" autoFocus allowClear prefix={<SearchOutlined />} onChange={value => this.onChange(value.target.value)} />
                    <Button size="large" onClick={() => this.props.close()}>Avbryt</Button>
                </div>
                {this.props.isLoading ?
                    <Spin className="location-search-spin" />
                    :
                    <LocationSearchList onSelect={() => this.props.close()} />
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        isLoading: state.locationSearch.geocodeIsLoading,
    }
}


function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        searchLocations: (searchTerm: string) => dispatch(geocode(searchTerm)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);