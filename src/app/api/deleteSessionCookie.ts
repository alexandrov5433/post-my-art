import { createCookie } from "@/lib/util/cookie";
import { NextApiRequest, NextApiResponse } from "next";

export async function deleteSessionCookie(req: NextApiRequest, res: NextApiResponse) {
        try {
            const cookieValue = createCookie('session', '0', true);
            res.setHeader('Set-Cookie', cookieValue);
            res.status(200).json({
                message: 'Cookie was deleted successfully!'
            })
        } catch (err) {
            res.status(500).json({
                message: (err as Error).message
            })
        }
}