import { ArtCardData } from "./definitions";
import { mockArtCardData } from "./mock-data";

export async function fetchArtCards(maxCardsCount: number = 10): Promise<ArtCardData[]> {
    await new Promise((res) => setTimeout(res, 1500));
    return mockArtCardData
}