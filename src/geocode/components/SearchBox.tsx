import React from "react";
import { Select, Typography, Spin } from 'antd';
import { connect } from 'react-redux';
import { AppState } from "../../store";
import { search, selectLocation } from "../../store/locationSearch/actions";
import { ILocation } from "../types";

const { Option } = Select;
const { Text } = Typography;

interface ISearchPageProps {
    style?: React.CSSProperties,
    selectedLocation?: ILocation,
    isLoading: boolean,
    errorMessage: string
    locationResults: ILocation[],
    selectLocation: (location: ILocation) => void,
    searchLocations: (searchTerm: string) => void
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
        // this.beginSearch = this.beginSearch.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    private handleTextChange(value: string): void {
        this.setState({
            ...this.state,
            searchText: value,
        })
    }

    private handleSearch(value: string): void {
        this.props.searchLocations(value);
    }

    public render() {
        let options: JSX.Element[] = [];

        // Loading
        if (this.props.isLoading)
            options.push(CreateOption(<Spin />, "spin"));
        else {
            // Response error
            if (this.props.errorMessage) {
                options.push(CreateOption(
                    <Text type="danger">Error! Response status: {this.props.errorMessage}</Text>,
                    "error",
                ));
            }
            else {

                // No locations found
                if (this.props.locationResults.length === 0)
                    options.push(CreateOption(<Text>No locations found.</Text>, "no locations"));
                // Locations found
                else
                    this.props.locationResults.forEach(location =>
                        options.push(CreateOption(
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Text strong>{location.name}  </Text>
                                <Text type="secondary">{location.country}</Text>
                            </div>,
                            location.name,
                        ))
                    );
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
        searchLocations: (searchTerm: string) => dispatch(search(searchTerm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);