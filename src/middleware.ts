import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { validateJWT } from "./lib/util/jwt";

export default async function sessionChecker(req: NextRequest) {
    try {
        const sessionCookie = req.cookies.get('session')?.toString() || '';
        if (!sessionCookie) {
            throw new Error(); //continue routing
        }
        const jwtPayload = await validateJWT(sessionCookie);
        (req as any).session = jwtPayload instanceof Error ? null : jwtPayload;
        return NextResponse.next();
    } catch (err) {
        (req as any).session = null;
        return NextResponse.next();
    }
}