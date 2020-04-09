import React from "react";
import { Select, Typography } from 'antd';
import { ILocation } from "../types";
import fetchILocation from "../search"
import { findByLabelText } from "@testing-library/react";

const { Option } = Select;
const { Text } = Typography;

interface ISearchPageProps {
    style?: React.CSSProperties
}

interface ISearchPageState {
    isLoading: boolean,
    locationResults: ILocation[],
    searchText: string,
}

class SearchBox extends React.Component<ISearchPageProps, ISearchPageState> {
    // id for handling the order of asynchronous geocode searches
    currentSearchId = 0;

    constructor(props: Readonly<ISearchPageProps>) {
        super(props);

        this.state = {
            isLoading: false,
            locationResults: [
                // Temporary data:
                {
                    country: "Country",
                    name: "City A",
                    lat: 0,
                    long: 0,
                    alt: 0,
                },
                {
                    country: "Country",
                    name: "City B",
                    lat: 0,
                    long: 0,
                    alt: 0,
                },
                {
                    country: "Country",
                    name: "City C",
                    lat: 0,
                    long: 0,
                    alt: 0,
                }],
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
        let results = await fetchILocation(str);

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
        const options = this.state.locationResults.map(location =>
            <Option key={location.name} value={location.name}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text strong>{location.name}  </Text>
                    <Text type="secondary">{location.country}</Text>
                </div>
            </Option>
        );
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

export default SearchBox;