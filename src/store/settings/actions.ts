import { ThemeModeTypes, ThemeTypes, UPDATE_SYSTEM_THEME, UPDATE_THEME_MODE } from './types';


export function updateThemeMode(themeMode: ThemeModeTypes) {
    return {
        type: UPDATE_THEME_MODE,
        themeMode: themeMode,
    }
}

export function updateSystemTheme(systemTheme: ThemeTypes) {
    return {
        type: UPDATE_SYSTEM_THEME,
        systemTheme: systemTheme,
    }
}
