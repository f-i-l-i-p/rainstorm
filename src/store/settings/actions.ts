import { ThemeTypes, UPDATE_THEME } from './types';


export function updateTheme(theme: ThemeTypes) {
    return {
        type: UPDATE_THEME,
        theme: theme,
    }
}
