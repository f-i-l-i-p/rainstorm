import React from "react";
import './style.css';
import { connect } from "react-redux";
import { AppState } from "../../../store";
import Header from "../../atoms/Header";
import { Divider, Radio, Space, Typography } from "antd";
import { ThemeModeTypes } from "../../../store/settings/types";
import { updateThemeMode } from "../../../store/settings/actions";

const { Title, Text } = Typography;

interface ISettingsPageProps {
    theme: ThemeModeTypes,
    updateThemeMode: (theme: ThemeModeTypes) => void,
    close: () => void,
}


class SettingsPage extends React.Component<ISettingsPageProps>{
    private onThemeChange(value: number) {
        switch (value) {
            case 1:
                this.props.updateThemeMode("light");
                break;
            case 2:
                this.props.updateThemeMode("dark");
                break;
            case 3:
                this.props.updateThemeMode("system");
                break;
        }
    }

    render() {
        let themeValue;
        switch (this.props.theme) {
            case "light":
                themeValue = 1;
                break;
            case "dark":
                themeValue = 2;
                break;
            case "system":
                themeValue = 3;
                break;
        }

        return (
            <div className="settings-page">
                <Header title="Inställningar" backButton={() => this.props.close()} backButtonName="Klar" />

                <div className="settings-content">
                    <Text className="settings-options-title" type="secondary" strong>Utseende</Text>
                    <Divider />
                    <Radio.Group className="settings-options" value={themeValue} onChange={(e) => this.onThemeChange(e.target.value)}>
                        <Space direction="vertical">
                            <Radio value={1}>Ljust</Radio>
                            <Divider />
                            <Radio value={2}>Mörkt</Radio>
                            <Divider />
                            <Radio value={3}>Följ System</Radio>
                        </Space>
                    </Radio.Group>
                    <Divider />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        theme: state.settings.themeMode,
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        updateThemeMode: (theme: ThemeModeTypes) => dispatch(updateThemeMode(theme)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
