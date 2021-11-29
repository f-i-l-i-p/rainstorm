import { Button, Divider, Input, Spin } from "antd";
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

interface ILocationSearchState {
    showUserPosition: boolean,
}

class LocationSearch extends React.Component<ILocationSearchProps, ILocationSearchState>{
    constructor(props: Readonly<ILocationSearchProps>) {
        super(props)

        this.state = {
            showUserPosition: true,
        }
    }

    private onChange(text: string) {
        this.props.searchLocations(text);

        const show = text.length == 0;

        if (show !== this.state.showUserPosition) {
            this.setState({
                ...this.state,
                showUserPosition: show,
            });
        }
    }

    render() {
        return (
            <div className="search">
                <div className="search-bar">
                    <Input
                        className="search-input"
                        size="large"
                        bordered={false}
                        placeholder="Sök"
                        autoFocus
                        allowClear
                        prefix={<SearchOutlined />}
                        onChange={value => this.onChange(value.target.value)}
                    />
                    <Button className="search-cancel-button" size="large" ghost onClick={() => this.props.close()}>Avbryt</Button>
                </div>
                <Divider style={{ margin: 0 }} />
                {this.props.isLoading ?
                    <Spin className="location-search-spin" />
                    :
                    <LocationSearchList onSelect={() => this.props.close()} showUserLocation={this.state.showUserPosition} />
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