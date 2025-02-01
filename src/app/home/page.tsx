import Image from "next/image";
import homeBannerStyles from '@/ui/homeComponents/home-banner.module.css';
import home_banner from '../../../public/home_banner.jpg';
import Button from "@/ui/button/button";
import artsContainerStyles from '@/ui/homeComponents/home-arts-container.module.css';
import { fetchArtCards, fetchUserData } from "@/lib/data";
import { ArtCardData } from "@/lib/definitions";
import { Suspense } from "react";
import ArtCardsHomeOverview from "@/ui/homeComponents/art-cards-home-overview";
import LoadingArtCards from "./loading";
import NavBar from "@/ui/nav/nav";
import { getUserIDFromSessionCookie } from '@/lib/actions/session';

export default async function Home() {
  const artCards: Promise<ArtCardData[]> = fetchArtCards(10);
  const userID = await getUserIDFromSessionCookie();
  console.log('userID', userID);
  let userData = null;
  if (userID) {
    userData = await fetchUserData(userID);
  }
  console.log('userData', userData);

  
  return (<>
    <NavBar userData={userData}></NavBar>
    <main>

      <section className={`${homeBannerStyles.homeBannerWrapper}`}>
        <Image
          className={`${homeBannerStyles.banner}`}
          src={home_banner}
          alt="A beautiful painting. A classical work."
        ></Image>
        <div className={`${homeBannerStyles.imageOverlay}`}>
          <div className={`${homeBannerStyles.content}`}>
            <h2 className={`${homeBannerStyles.slogan}`}>Made with passion.</h2>
            <Button
              type="button"
              title="Create your personal gallery!"
              stylingType="generic"></Button>
          </div>
        </div>
      </section>

      <section className={`${artsContainerStyles.homeArtsContainer}`}>
        <Suspense fallback={LoadingArtCards()}>
          <ArtCardsHomeOverview cardsData={artCards}></ArtCardsHomeOverview>
        </Suspense>
        <div className={`${artsContainerStyles.bottomButtonContainer}`}>
          <Button type="button" stylingType="generic" title="TO DO"></Button>
        </div>
      </section>

    </main>
  </>
  );
}