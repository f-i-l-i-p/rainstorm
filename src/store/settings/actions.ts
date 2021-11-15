import { ThemeTypes, UPDATE_THEME } from './types';


export function updateSettings(theme: ThemeTypes) {
    return {
        type: UPDATE_THEME,
        theme: theme,
    }
}
