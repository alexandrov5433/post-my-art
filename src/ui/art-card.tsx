import { ArtCardData } from "@/lib/definitions";
import styles from '@/ui/styles/art-card.module.css';
import Image from "next/image";
import Button from "./button";

export default function ArtCard(data: ArtCardData) {
    return (
        <article
            key={data.artId}
            className={`${styles.container}`}>
            <section className={`${styles.topUser}`}>
                <div></div>
                <div>
                    <Button
                        type="button"
                        stylingType="follow"
                        title="Follow"
                    ></Button>
                </div>
            </section>

            <Image
                src={data.artUrl}
                alt="An art piece from this user."
                width={300}
                height={300}
            ></Image>

            <section className={`${styles.bottom}`}>

            </section>
        </article>
    );
}