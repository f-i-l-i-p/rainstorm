import { SettingTypes, ThemeModeTypes, ThemeTypes, UPDATE_SETTING, UPDATE_SYSTEM_THEME, UPDATE_THEME_MODE } from './types';


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

export function updateSetting(setting: SettingTypes) {
    return {
        type: UPDATE_SETTING,
        setting: setting,
    }
}
