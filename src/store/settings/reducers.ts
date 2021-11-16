import { getCookie, setCookie } from "../../helpers/cookies";
import { ISettingsState, SettingsActionTypes, ThemeModeTypes, ThemeTypes, UPDATE_SYSTEM_THEME, UPDATE_THEME_MODE } from "./types";

const THEME_MODE_COOKIE = "theme-mode";

const initialState: ISettingsState = {
    themeMode: getCookie(THEME_MODE_COOKIE) as ThemeModeTypes || "system",
    theme: "light",
    systemTheme: getInitialSystemTheme(),
}

export function settingsReducer(state = initialState, action: SettingsActionTypes): ISettingsState {
    switch (action.type) {
        case UPDATE_THEME_MODE:

            let theme: ThemeTypes;
            switch (action.themeMode) {
                case "light":
                    theme = "light";
                    break;
                case "dark":
                    theme = "dark";
                    break;
                case "system":
                    theme = state.systemTheme;
            }

            applyTheme(theme);
            setCookie(THEME_MODE_COOKIE, action.themeMode, 365)

            return {
                ...state,
                themeMode: action.themeMode,
                theme: theme,
            };

        case UPDATE_SYSTEM_THEME:
            if (state.themeMode === "system") {
                applyTheme(action.systemTheme);
            }

            return {
                ...state,
                systemTheme: action.systemTheme,
            }

        default:
            return state;
    }
}

function applyTheme(theme: ThemeTypes) {
    const DARK_CLASS = "dark";

    if (theme === "dark") {
        document.documentElement.classList.add(DARK_CLASS);
    } else {
        document.documentElement.classList.remove(DARK_CLASS);
    }
}

function getInitialSystemTheme(): ThemeTypes {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark";
    } else {
        return "light";
    }
}

function setInitialTheme() {
    let theme: ThemeTypes;
    switch (initialState.themeMode) {
        case "light":
            theme = "light";
            break;
        case "dark":
            theme = "dark";
            break;
        case "system":
            theme = initialState.systemTheme;
    }

    applyTheme(theme);
}

setInitialTheme();