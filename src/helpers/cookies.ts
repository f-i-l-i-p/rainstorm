
/**
 * Sets a new cookie. If a cookie with the given name already exists, it will be overwritten.
 * @param name Name of the cookie.
 * @param value Value of the cookie.
 * @param maxAge Seconds until the cookie will expire. Leave empty for session cookie.
 */
export function setCookie(name: string, value: string, maxAge?: number): void {
    let expires;
    if (maxAge) {
        expires = "; max-age=" + maxAge;
    } else {
        expires = "";
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

/**
 * Returns the value of a cookie. If the cookie does not exist, null is returned.
 * @param name Name of the cookie.
 * @returns Value of the cookie or null.
 */
export function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split('=');

        if (cookieName === name) {
            return cookieValue;
        }
    }

    return null;
}

/**
 * Checks if a cookie exists.
 * @param name Name of the cookie.
 * @returns True if it exists, otherwise false.
 */
export function existsCookie(name: string): boolean {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookieName = cookies[i].split('=')[0];

        if (cookieName === name) {
            return true;
        }
    }

    return false;
}

/**
 * Deletes a cookie.
 * @param name Name of the cookie to delete.
 */
export function deleteCookie(name: string): void {
    document.cookie = name + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;';
}
