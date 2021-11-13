import React from "react";
import './style.css';
import { connect } from "react-redux";
import { requestUserPosition, selectUserLocation } from "../../../store/locationSearch/actions";
import { AppState } from "../../../store";
import { ILocation } from "../../../location/types";
import { fetchForecasts } from "../../../store/forecasts/actions";
import Header from "../../atoms/Header";
import { Radio, Space, Typography } from "antd";

const { Title } = Typography;

interface ISettingsPageProps {
    close: () => void,
}

interface ISettingsPageState {
    showLocationSearch: boolean,
}

class SettingsPage extends React.Component<ISettingsPageProps, ISettingsPageState>{
    constructor(props: Readonly<ISettingsPageProps>) {
        super(props)

        this.state = {
            showLocationSearch: false,
        }
    }

    render() {
        return (
            <div className="settings-page">
                <Header title="Inställningar" backButton={() => this.props.close()} backButtonName="Tillbaka" />

                <div className="settings-content">
                    <Title className="settings-options-title" type="secondary" level={4}>Utseende</Title>
                    <Radio.Group className="settings-options">
                        <Space direction="vertical">
                            <Radio value={1}>Ljust</Radio>
                            <Radio value={2}>Mörkt</Radio>
                            <Radio value={3}>Följ System</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
    }
}


function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    // TODO: Remove
    return {
        findUserPosition: (onSuccess: any) => dispatch(requestUserPosition(onSuccess)),
        selectUserLocation: () => dispatch(selectUserLocation()),
        fetchForecasts: (location: ILocation) => dispatch(fetchForecasts(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
