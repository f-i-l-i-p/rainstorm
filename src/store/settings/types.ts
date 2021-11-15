
export interface ISettingsState {
    themeMode: ThemeModeTypes,
    theme: ThemeTypes,
    systemTheme: ThemeTypes,
}


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


export type SettingsActionTypes = IThemeModeAction | IUpdateSystemThemeAction;
