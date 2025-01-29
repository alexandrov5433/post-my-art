import { NextApiRequest, NextApiResponse } from "next";
import { createCookie } from "@/lib/util/cookie";
import { createJWT } from "@/lib/util/jwt";

export async function setSessionCookie(req: NextApiRequest, res: NextApiResponse) {
    try {
        const userID: string = req.body.userID;
        const token = await createJWT({ userID });
        if (token instanceof Error) {
            throw token;
        }
        const cookieValue = createCookie('session', token);
        res.setHeader('Set-Cookie', cookieValue);
        res.status(200).json({
            message: 'Cookie was set successfully!'
        })
    } catch (err) {
        res.status(500).json({
            message: (err as Error).message
        })
    }
}