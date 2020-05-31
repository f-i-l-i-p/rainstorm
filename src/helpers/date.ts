/**
 * Returns a list of Date objects with one hour difference, starting with the current hour.
 * @param count The number of Date objects to return.
 */
export function listHoursFromNow(count: number): Date[] {
    let start = new Date();
    start.setHours(start.getHours() + 1);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    return listDates(start, 3600000, count);
}

/**
 * Returns a list of Date objects with one day difference, the first day will
 * be at the current hour and following days will be at the 12th hour.
 * @param count The number of Date objects to return.
 */
export function listDaysFromNow(count: number): Date[] {
    let first = new Date();
    first.setHours(first.getHours() + 1);
    first.setMinutes(0);
    first.setSeconds(0);
    first.setMilliseconds(0);

    let start = new Date(first.getTime());
    start.setHours(12);
    start.setDate(start.getDate() + 1);

    return [start, ...listDates(start, 86400000, count - 1)];
}

/**
 * Returns an array of Date objects.
 * @param start The first date in the array.
 * @param interval The time difference in milliseconds.
 * @param count The number of Date objects to return.
 */
export function listDates(start: Date, interval: number, count: number): Date[] {
    let times: Date[] = []

    for (let i = 0; i < count; i++) {
        times.push(new Date(start.getTime() + (i * interval)));
    }

    return times;
}