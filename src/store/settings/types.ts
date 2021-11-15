
export interface ISettingsState {
    theme: ThemeTypes,
}

export type ThemeTypes = "light" | "dark" | "system";

export const UPDATE_THEME = "UPDATE_THEME";

interface IThemeAction {
    type: typeof UPDATE_THEME,
    theme: ThemeTypes,
}

export type SettingsActionTypes = IThemeAction;
