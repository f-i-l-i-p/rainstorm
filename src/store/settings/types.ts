
export interface ISettingsState {
    themeMode: ThemeModeTypes,
    systemTheme: ThemeTypes,
    theme: ThemeTypes,
    showGust: boolean,
}

export type SettingTypes = {
    [key in keyof ISettingsState]?: ISettingsState[key];
};

// Theme mode

export type ThemeModeTypes = "light" | "dark" | "system";

export const UPDATE_THEME_MODE = "UPDATE_THEME_MODE";

interface IThemeModeAction {
    type: typeof UPDATE_THEME_MODE,
    themeMode: ThemeModeTypes,
}


// Theme
export type ThemeTypes = "light" | "dark";

// System theme

export const UPDATE_SYSTEM_THEME = "UPDATE_SYSTEM_THEME";

interface IUpdateSystemThemeAction {
    type: typeof UPDATE_SYSTEM_THEME,
    systemTheme: ThemeTypes,
}



// Settings
export const UPDATE_SETTING = "UPDATE_SETTING";

interface IUpdateSetting {
    type: typeof UPDATE_SETTING,
    setting: SettingTypes,
}


export type SettingsActionTypes = IThemeModeAction | IUpdateSystemThemeAction | IUpdateSetting;
