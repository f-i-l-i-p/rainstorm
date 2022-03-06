import { ILocation } from "../location/types";
import { getDefaultLocation } from "../store/locationSearch/reducers";

//
// WARNING: Changing 'CHARS' or 'DECIMALS' will break backwards compatibility with old URLs.
//

/** Characters used for encoding the numbers */
const CHARS: string[] = ("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").split('');
/** Number of decimals to encode */
const DECIMALS: number = 7


/**
 * Updates the current URL path with a given location.
 */
export function setUrlLocation(location: ILocation): void {
    const encodedPos = encodePosition(location.lat, location.long)

    let newPath: string = ''

    if (location.name != getDefaultLocation().name) {
        newPath = '/#/' + encodedPos + '/' + location.name
    }

    window.history.replaceState(null, '', newPath)
}


/**
 * Gets the location and name from the current URL.
 */
export function getUrlLocation(): { name: string, lat: number, lon: number } | undefined {
    const regex = new RegExp("#/.+/.+");
    let path = decodeURI(window.location.hash)

    if (!regex.test(path)) {
        return undefined;
    }

    const pathSplit = path.split('/')

    const encodedPos = pathSplit[1]
    const names = pathSplit.splice(2, pathSplit.length - 2)

    const decodedPos = decodePosition(encodedPos)

    return {
        name: names[names.length - 1],
        lat: decodedPos.lat,
        lon: decodedPos.lon,
    }
}


/**
 * Encodes a latitude and longitude to a single string.
 */
function encodePosition(lat: number, lon: number): string {
    const multiplier = Math.pow(10, DECIMALS)
    lat = Math.round(lat * multiplier)
    lon = Math.round(lon * multiplier)

    let encoded_lat = numberEncode(lat)
    let encoded_lon = numberEncode(lon)

    const length = Math.max(encoded_lat.length, encoded_lon.length)

    encoded_lat = encoded_lat.padStart(length, CHARS[0])
    encoded_lon = encoded_lon.padStart(length, CHARS[0])

    return encoded_lat + encoded_lon
}


/**
 * Decodes a string to a latitude and a longitude.
 */
function decodePosition(str: string): { lat: number, lon: number } {
    const encoded_lat = str.substring(0, str.length / 2)
    const encoded_lon = str.substring(str.length / 2, str.length)

    const multiplier = Math.pow(10, DECIMALS)
    let lat = numberDecode(encoded_lat) / multiplier
    let lon = numberDecode(encoded_lon) / multiplier

    return { lat: lat, lon: lon }
}


/**
 * Encodes a number as a URL-safe string.
 * @param input Number to encode.
 * @returns URL-safe string.
 */
function numberEncode(input: number): string {

    // Recursively encodes a number.
    // Can only handle positive numbers.
    function recursiveEncode(current_number: number, current: string = ''): string {
        const modify = current_number % CHARS.length
        const remain = Math.floor(current_number / CHARS.length)

        const result = CHARS[modify] + current

        if (remain > 0) {
            return recursiveEncode(remain, result)
        } else {
            return result
        }
    }

    if (input < 0) {
        return '-' + recursiveEncode(-input)
    } else {
        return recursiveEncode(input)
    }
}


/**
 * Decodes a string to a number.
 * @param input String to decode.
 * @returns The decoded value.
 */
function numberDecode(input: string): number {
    const tokens = input.split('')

    let isNegative: boolean = false
    let result: number = 0

    for (let token of tokens) {
        if (token === '-') {
            isNegative = true
            continue
        }
        result = (result * CHARS.length) + CHARS.indexOf(token)
    }

    return isNegative ? -result : result
}