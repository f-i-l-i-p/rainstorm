import React from "react";
import { Select, Typography, Spin } from 'antd';
import { ILocation } from "../types";
import { fetchILocationsResponse, fetchILocations } from "../search"

const { Option } = Select;
const { Text } = Typography;

interface ISearchPageProps {
    style?: React.CSSProperties
}

interface ISearchPageState {
    isLoading: boolean,
    locationResults: fetchILocationsResponse,
    searchText: string,
}

class SearchBox extends React.Component<ISearchPageProps, ISearchPageState> {
    // id for handling the order of asynchronous geocode searches
    currentSearchId = 0;

    constructor(props: Readonly<ISearchPageProps>) {
        super(props);

        this.state = {
            isLoading: false,
            locationResults: {
                status: 200,
                locations: []
            },
            searchText: "",
        }
        this.beginSearch = this.beginSearch.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    private async beginSearch(str: string) {
        if (!str)
            return;

        // Give this search the latest search id
        this.currentSearchId++;
        let searchId = this.currentSearchId;

        this.setState({
            ...this.state,
            isLoading: true,
        });

        // search
        let results = await fetchILocations(str);

        // If this still is the latest search, update the state
        if (searchId === this.currentSearchId) {
            this.setState({
                ...this.state,
                isLoading: false,
                locationResults: results,
            });
        }
    }

    private handleTextChange(value: string): void {
        this.setState({
            ...this.state,
            searchText: value,
        })
    }

    private handleSearch(value: string): void {
        this.beginSearch(value.trim());
    }

    public render() {
        let options: JSX.Element[] = [];

        if (this.state.isLoading)
            // Loading
            options.push(CreateOption(<Spin />, "spin"));
        else {
            if (this.state.locationResults.status === 200) {
                if (this.state.locationResults.locations.length === 0)
                    // No locations found
                    options.push(CreateOption(<Text>No locations found.</Text>, "no locations"));
                else
                    // Locations found
                    this.state.locationResults.locations.forEach(location =>
                        options.push(CreateOption(
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Text strong>{location.name}  </Text>
                                <Text type="secondary">{location.country}</Text>
                            </div>,
                            location.name,
                        ))
                    );
            }
            else
                // Response error
                options.push(CreateOption(
                    <Text type="danger">Error! Response status: {this.state.locationResults.status}</Text>,
                    "error",
                ));
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
                notFoundContent={null}
            >
                {options}
            </Select>
        );
    }
}

function CreateOption(content: JSX.Element, value: string): JSX.Element {
    return (
        <Option value={value} key={value}>
            {content}
        </Option>
    );
}

export default SearchBox;