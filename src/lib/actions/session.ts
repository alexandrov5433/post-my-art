'use server';
import { cookies } from "next/headers";
import { createJWT, JwtPayload, validateJWT } from "../util/jwt";

export async function genJWTAndSetSessionCookie(userID: string | number, mustCookiePersistAfterSessionEnds: boolean = true) {
    const token = await createJWT({ userID: userID.toString() });
    if (token instanceof Error) {
        throw token;
    }
    // 1 Year = 31557600000 Milliseconds
    const cookiePool = await cookies();
    cookiePool.set('session', token, {
        httpOnly: true,
        secure: true,
        ...(mustCookiePersistAfterSessionEnds ? { expires: new Date(new Date().getTime() + 31557600000) } : {}),
    });
}

export async function deleteSessionCookie() {
    const cookiePool = await cookies();
    cookiePool.set('session', '0', {
        httpOnly: true,
        secure: true,
        expires: 0,
        maxAge: 0
    });
}

export async function getUserIDFromSessionCookie(): Promise<string | null> {
    try {
        const cookiePool = await cookies();
        const c: { name: string, value: string } | undefined = cookiePool.get('session');
        if (!c) { return null };
        const payload = await validateJWT(c.value);
        if (!payload || (payload as JwtPayload).userID.length === 0) {
            return null;
        }
        return (payload as JwtPayload).userID;
    } catch (err) {
        console.log('ERROR occured while validating the JWT:', (err as Error).message);
        return null;
    }
}