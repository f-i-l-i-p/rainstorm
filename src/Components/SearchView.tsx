import React from "react";
import { TextField, Card, Paper } from "@material-ui/core";
import { ILocation } from "../store/types";
import geoSearch from "../store/geocode"

interface ISearchPageProps {
}

interface ISearchPageState {
    LocationResults: ILocation[]
}

class SearchView extends React.Component<ISearchPageProps, ISearchPageState> {
    constructor(props: Readonly<ISearchPageProps>) {
        super(props);

        this.state = {
            LocationResults: []
        }
        this.search = this.search.bind(this);
        this.textChanged = this.textChanged.bind(this);
    }

    private search(str: string): void {
        str = str.trim()
        let results = str ? geoSearch(str) : [];

        this.setState({
            ...this.state,
            LocationResults: results,
        });
    }

    private textChanged(e: React.ChangeEvent<HTMLInputElement>): void {
        e.persist();

        this.search(e.target.value);
    }

    public render() {
        return (
            <div>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    fullWidth autoFocus={true}
                    onChange={this.textChanged} />

                {this.state.LocationResults.map((location, index) => (
                    <div>
                        {location.name}
                    </div>
                ))}
            </div>
        );
    }
}

export default SearchView;