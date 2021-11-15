import { ISettingsState, UPDATE_SETTINGS } from './types';


export function updateSettings(settings: ISettingsState) {
    return {
        type: UPDATE_SETTINGS,
        settings: settings,
    }
}
