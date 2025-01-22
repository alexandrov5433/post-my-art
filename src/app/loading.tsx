import styles from '@/ui/styles/loadingArtCards.module.css';

export default function LoadingArtCards(cardsCount: number = 15) {
    return (
        <div className={`${styles.cardsContainer}`}>
            {
                [...Array(cardsCount)].map((e, i) => <article key={i} className={`${styles.card}`}>
                    <section className={`${styles.top}`}>
                        <div className={`${styles.circle} ${styles.animate}`}></div>
                        <div className={`${styles.band} ${styles.animate}`}></div>
                    </section>
                    <section className={`${styles.image} ${styles.animate}`}></section>
                    <section className={`${styles.bottom}`}></section>
                </article>)
            }
        </div>
    );
}