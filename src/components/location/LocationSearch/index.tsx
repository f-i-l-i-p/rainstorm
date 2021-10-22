import { Input, Spin } from "antd";
import React from "react";
import { connect } from "react-redux";
import { search } from "../../../store/locationSearch/actions";
import { SearchOutlined } from '@ant-design/icons';
import { AppState } from "../../../store";
import LocationSearchList from "../LocationSearchList";
import './style.css';

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
                <Input autoFocus allowClear prefix={<SearchOutlined />} onChange={value => this.onChange(value.target.value)} />
                {this.props.isLoading ?
                    <Spin />
                    :
                    <LocationSearchList onSelect={() => this.props.close()} />
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        isLoading: state.locationSearch.isLoading,
    }
}


function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        searchLocations: (searchTerm: string) => dispatch(search(searchTerm)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);