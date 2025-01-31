import { ArtCardData, UserData } from "./definitions";
import { mockArtCardData } from "./mock-data";
import { sql } from "@vercel/postgres";

export async function fetchArtCards(maxCardsCount: number = 10): Promise<ArtCardData[]> {
    await new Promise((res) => setTimeout(res, 1500));
    return mockArtCardData
}

export async function fetchUserData(userID: string): Promise<UserData | null> {
    try {
        const res = await sql`SELECT * FROM "User" WHERE ("userID" = ${userID})`;
        if (!res) {
            throw new Error(`Failed to fetch data from DB for userID: "${userID}".`);
        }
        const payload: UserData = (res?.rows[0] as UserData);
        if (!Object.hasOwn(payload, 'username')) {
            throw new Error(`The data received from DB for userID: "${userID}" is incomplete.`);
        }
        console.log(payload);
        return payload;
    } catch (err) {
        console.error((err as Error).message);
        return null;
    }
}