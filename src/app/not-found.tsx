import styles from '@/ui/styles/not-found.module.css';
import Button from '@/ui/button/button';

export default function NotFound() {
    return (
        <main className={`${styles.mainWrapper}`}>
            <article className={`${styles.contentWrapper}`}>
                <h1 className={`${styles.number} ${styles.colorInherit}`}>404</h1>
                <section>
                    <h3 className={`${styles.firstSentance} ${styles.colorInherit}`}>Sorry! Page not found!</h3>
                </section>
                <section>
                    <p className={`${styles.secondSentance} ${styles.colorInherit}`}>Sorry, the page you are looking for couldn't be found. Please, go back to the home page.</p>
                </section>
                <section>
                    <Button
                        type='button'
                        stylingType='generic'
                        title='Go Back To Homepage'
                        redirectToURL='/home'
                    ></Button>
                </section>
            </article>
        </main>
    );
}