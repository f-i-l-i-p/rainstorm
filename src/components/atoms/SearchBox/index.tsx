import React from "react";
import { Select, Typography, Spin } from 'antd';
import { connect } from 'react-redux';
import { AppState } from "../../../store";
import { search, selectLocation, updateUserLocation } from "../../../store/locationSearch/actions";
import { ILocation } from "../../../store/types";
import { fetchForecasts } from "../../../store/forecasts/actions";

const { Option } = Select;
const { Text } = Typography;

interface ISearchPageProps {
    style?: React.CSSProperties,
    selectedLocation?: ILocation,
    isLoading: boolean,
    errorMessage: string
    locationResults: ILocation[],
    selectLocation: (location: ILocation) => void,
    searchLocations: (searchTerm: string) => void,
    fetchForecasts: (location: ILocation) => void,
    updateUserLocation: (location?: ILocation) => void,
}

interface ISearchPageState {
    searchText: string,
}

class SearchBox extends React.Component<ISearchPageProps, ISearchPageState> {
    constructor(props: Readonly<ISearchPageProps>) {
        super(props);

        this.state = {
            searchText: "",
        }

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentDidMount() {
        // Get the user location
        // TODO: Move this somewhere else
        navigator.geolocation.getCurrentPosition(pos => {
            const userLocation: ILocation = {
                country: '',
                name: 'Your Location',
                lat: pos.coords.latitude,
                long: pos.coords.longitude,
                alt: pos.coords.altitude ? pos.coords.altitude : 0
            };
            // update user location
            this.props.updateUserLocation(userLocation);
            // select user location
            this.props.selectLocation(userLocation);
            // fetch forecast for user location
            this.props.fetchForecasts(userLocation);
        }, error => {
            // user location error
            // this.props.updateUserLocation(undefined)
        });
    }

    private handleTextChange(value: string): void {
        this.setState({
            ...this.state,
            searchText: value,
        })
    }

    private handleSearch(value: string): void {
        if (!value) return;
        this.props.searchLocations(value);
    }

    private handleSelect(value: string): void {
        const results = this.props.locationResults;
        for (let i = 0; i < results.length; i++) {
            if (results[i].name === value) {
                this.props.selectLocation(results[i])
                this.props.fetchForecasts(results[i])
                break;
            }
        }
    }

    public render() {
        let options: JSX.Element[] = [];

        // Loading
        if (this.props.isLoading)
            options.push(CreateOption(<Spin />, "spin", 0));
        else {
            // Response error
            if (this.props.errorMessage) {
                options.push(CreateOption(
                    <Text type="danger">Error! Response status: {this.props.errorMessage}</Text>,
                    "error", 0
                ));
            }
            else {

                // No locations found
                if (this.props.locationResults.length === 0)
                    options.push(CreateOption(<Text>No locations found.</Text>, "no locations", 0));
                // Locations found
                else {
                    const locations = this.props.locationResults;

                    for (let i = 0; i < locations.length; i++) {
                        const location = locations[i]

                        options.push(CreateOption(
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <Text strong>{location.name}  </Text>
                                {<Text type="secondary">{location.country}</Text>}
                            </div>,
                            location.name,
                            i
                        ))
                    }
                }
            }
        }

        return (
            <Select
                showSearch
                style={this.props.style}
                value={this.state.searchText ? this.state.searchText : undefined} // the placeholder only shows when value=undefined
                placeholder="Search for a city"
                size="large"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={value => this.handleSearch(value)}
                onChange={value => this.handleTextChange(value)}
                onSelect={value => this.handleSelect(value)}
                notFoundContent={null}
            >
                {options}
            </Select>
        );
    }
}

function CreateOption(content: JSX.Element, value: string, key: any): JSX.Element {
    return (
        <Option value={value} key={key}>
            {content}
        </Option>
    );
}

function mapStateToProps(state: AppState) {
    return {
        selectedLocation: state.locationSearch.selectedLocation,
        locationResults: state.locationSearch.searchResults,
        isLoading: state.locationSearch.isLoading,
        errorMessage: state.locationSearch.errorMessage
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        selectLocation: (location: ILocation) => dispatch(selectLocation(location)),
        searchLocations: (searchTerm: string) => dispatch(search(searchTerm)),
        fetchForecasts: (location: ILocation) => dispatch(fetchForecasts(location)),
        updateUserLocation: (location?: ILocation) => dispatch(updateUserLocation(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);