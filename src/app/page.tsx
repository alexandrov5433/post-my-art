
import Image from "next/image";
import homeBannerStyles from '@/ui/styles/home-banner.module.css';
import home_banner from '../../public/home_banner.jpg';
import Button from "@/ui/button";
import artsContainerStyles from '@/ui/styles/home-arts-container.module.css';
import { fetchArtCards } from "@/lib/data";
import { ArtCardData } from "@/lib/definitions";
import { Suspense } from "react";
import ArtCardsHomeOverview from "@/ui/art-cards-home-overview";


export default async function Home() {
  const artCards: Promise<ArtCardData[]> = fetchArtCards(10);
  return (
    <main>

      <section className={`${homeBannerStyles.homeBannerWrapper}`}>
        <Image
          src={home_banner}
          alt="A beautiful painting. A classical work."
        ></Image>
        <div className={`${homeBannerStyles.imageOverlay}`}>
          <div className={`${homeBannerStyles.content}`}>
            <h2>Made with passion.</h2>
            <Button
              type="button"
              title="Create your personal gallery!"
              stylingType="generic"></Button>
          </div>
        </div>
      </section>

      <section className={`${artsContainerStyles.homeArtsContainer}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ArtCardsHomeOverview cardsData={artCards}></ArtCardsHomeOverview>
        </Suspense>
        <div className={`${artsContainerStyles.bottomButtonContainer}`}>
          <Button type="button" stylingType="generic" title="TO DO"></Button>
        </div>
      </section>

    </main>
  );
}