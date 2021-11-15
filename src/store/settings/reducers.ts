import { ISettingsState, SettingsActionTypes, UPDATE_THEME } from "./types";

const initialState: ISettingsState = {
    theme: "system",
}

export function settingsReducer(state = initialState, action: SettingsActionTypes): ISettingsState {
    switch (action.type) {
        case UPDATE_THEME:
            return {
                ...state,
                theme: action.theme,
            };
        default:
            return state;
    }
}
