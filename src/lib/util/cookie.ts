import cookie from 'cookie';

export function createCookie(cookieName: string, cookieValue: string, isForDeletion: boolean = false) {
    return cookie.serialize(cookieName, cookieValue, {
        httpOnly: true,
        secure: true,
        ...{ maxAge: isForDeletion ? 0 : (60 * 60 * 24 * 365 * 100) }, 
        // one hundred years
    });
}

export function parseCookie(cookieValue: string) {
    return cookie.parse(cookieValue);
}