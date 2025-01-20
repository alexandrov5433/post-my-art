'use client';

import { ArtCardData } from "@/lib/definitions";
import { use } from "react";
import useMasonry from "@/lib/hooks/useMasonry";
import homeArtsContainerStyle from '@/ui/styles/home-arts-container.module.css';
import ArtCard from "./art-card";

export default function ArtCardsHomeOverview({
    cardsData
}: {
    cardsData: Promise<ArtCardData[]>
}) {
    const cards = use(cardsData);
    const masonryContainer = useMasonry();
    return (
        <div
            ref={masonryContainer}
            className={`${homeArtsContainerStyle.cardsContainer}`}>
            {cards.map(c => ArtCard(c))}
        </div>
    );
}