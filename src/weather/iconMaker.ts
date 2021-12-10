import { SunTimes } from "./sunrise";
import { WeatherIcon } from "./types";


/**
 * Returns true if a given time is at night.
 */
export function isNight(date: Date, sunTimes: SunTimes): boolean {
    const dateSeconds = dateToTime(date);
    const sunRiseSeconds = dateToTime(sunTimes.sunrise);
    const sunSetSeconds = dateToTime(sunTimes.sunset);

    const result = (sunRiseSeconds > dateSeconds || dateSeconds > sunSetSeconds);
    return result;
}

/**
 * Returns true if a given time span is at night.
 */
export function isSpanNight(start: Date, end: Date, sunTimes: SunTimes) {
    const date = new Date((start.getTime() + end.getTime()) / 2);

    return isNight(date, sunTimes);
}

/**
 * Returns the night version of an icon.
 */
export function toNight(icon: WeatherIcon): WeatherIcon {
    switch (icon) {
        case WeatherIcon.clear_sky_day:
            return WeatherIcon.clear_sky_night;
        case WeatherIcon.half_clear_sky_day:
            return WeatherIcon.half_clear_sky_night;
        case WeatherIcon.nearly_clear_sky_day:
            return WeatherIcon.nearly_clear_sky_night;
    }
    return icon;
}

/**
 * Returns the time of the day in seconds
 */
function dateToTime(date: Date): number {
    return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() * 1000;
}
