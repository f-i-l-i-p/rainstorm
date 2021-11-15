
export interface ISettingsState {
    theme: "light" | "dark" | "system",
}

export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

interface IUpdateSettingsAction {
    type: typeof UPDATE_SETTINGS,
    settings: ISettingsState,
}

export type SettingsActionTypes = IUpdateSettingsAction;
