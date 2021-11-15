import { ISettingsState, SettingsActionTypes, UPDATE_SETTINGS } from "./types";

const initialState: ISettingsState = {
    theme: "system",
}

export function settingsReducer(state = initialState, action: SettingsActionTypes): ISettingsState {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return {
                ...action.settings,
            };
        default:
            return state;
    }
}
