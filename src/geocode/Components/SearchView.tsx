import React from "react";
import { TextField } from "@material-ui/core";
import { ILocation } from "../types";
import fetchILocation from "../search"

interface ISearchPageProps {
}

interface ISearchPageState {
    IsSearching: boolean,
    LocationResults: ILocation[],
}

class SearchView extends React.Component<ISearchPageProps, ISearchPageState> {
    // id for handling the order of asynchronous geocode searches
    currentSearchId = 0;

    constructor(props: Readonly<ISearchPageProps>) {
        super(props);

        this.state = {
            IsSearching: false,
            LocationResults: [],
        }
        this.beginSearch = this.beginSearch.bind(this);
        this.textChanged = this.textChanged.bind(this);
    }

    private async beginSearch(str: string) {
        // Give this search the latest search id
        this.currentSearchId++;
        let searchId = this.currentSearchId;

        this.setState({
            ...this.state,
            IsSearching: true,
        });

        // search
        let results = str ? await fetchILocation(str) : [];

        // If this still is the latest search, update the state
        if (searchId === this.currentSearchId) {
            this.setState({
                ...this.state,
                IsSearching: false,
                LocationResults: results,
            });
        }
    }

    private textChanged(e: React.ChangeEvent<HTMLInputElement>): void {
        e.persist();

        this.beginSearch(e.target.value.trim());
    }

    public render() {
        return (
            <div>
                {/* Input field */}
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    fullWidth autoFocus={true}
                    onChange={this.textChanged} />

                {/* Loading text */}
                {this.state.IsSearching &&
                    <text>Loading...</text>
                }

                {/* Locations list */}
                {this.state.LocationResults.map((location, index) => (
                    <div>
                        {location.name}
                        {location.country}
                        {location.lat}
                        {location.long}
                    </div>
                ))}
            </div>
        );
    }
}

export default SearchView;