import Image from "next/image";
import styles from '@/ui/styles/home-banner.module.css';
import home_banner from '../../public/home_banner.jpg';
import Button from "@/ui/buttons/button";
import { charm } from "@/ui/fonts";

export default function Home() {
  return (
    <main>
      <div className={`${styles.homeBannerWrapper}`}>
        <Image
          src={home_banner}
          alt="A beautiful painting. A classical work."
        ></Image>
        <div className={`${styles.imageOverlay}`}>
          <div className={`${styles.content}`}>
            <h2>Made with passion.</h2>
            <Button
              type="button"
              title="Create your personal gallery!"
              stylingType="generic"></Button>
          </div>
        </div>
      </div>
    </main>
  );
}
