import React from "react";
import './style.css';
import { connect } from "react-redux";
import { AppState } from "../../../store";
import Header from "../../atoms/Header";
import { Divider, Radio, Space, Switch, Typography } from "antd";
import { SettingTypes, ThemeModeTypes } from "../../../store/settings/types";
import { updateSetting as updateSettings, updateThemeMode } from "../../../store/settings/actions";

const { Text } = Typography;

interface ISettingsPageProps {
    theme: ThemeModeTypes,
    showGust: boolean,
    showMinMaxTemp: boolean,
    updateThemeMode: (theme: ThemeModeTypes) => void,
    updateSettings: (setting: SettingTypes) => void,
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
                    <div>
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

                        <Text className="settings-options-title" type="secondary" strong>Väder</Text>
                        <Divider />
                        <div className="settings-options">
                            <Space direction="vertical">
                                <div className="settings-row">
                                    <Text>Visa min/max temperatur</Text>
                                    <Switch checked={this.props.showMinMaxTemp} onChange={(status) => this.props.updateSettings({ showMinMaxTemp: status })} />
                                </div>
                                <Divider />
                                <div className="settings-row">
                                    <Text>Visa byvind</Text>
                                    <Switch checked={this.props.showGust} onChange={(status) => this.props.updateSettings({ showGust: status })} />
                                </div>
                            </Space>
                        </div>
                        <Divider />
                    </div>

                    {/* <a id="privacy-policy" href="https://f-i-l-i-p.github.io/rainstorm/privacy-policy.html" target="_blank">privacy policy</a >*/}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        theme: state.settings.themeMode,
        showGust: state.settings.showGust,
        showMinMaxTemp: state.settings.showMinMaxTemp,
    }
}

function mapDispatchToProps(dispatch: any) { // TODO: Fix any type
    return {
        updateThemeMode: (theme: ThemeModeTypes) => dispatch(updateThemeMode(theme)),
        updateSettings: (setting: SettingTypes) => dispatch(updateSettings(setting)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
