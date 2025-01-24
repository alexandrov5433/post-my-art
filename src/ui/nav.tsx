import styles from '@/ui/styles/nav.module.css';
import { charm } from './fonts';
import Search from './search';
import Button from './button';

export default function NavBar() {
    return (
        <div className={styles.container}>

            <div className={styles.searchAndMenu}>
                <div className={styles.logoAndSearch}>
                    <h1 className={`${charm.variable}`}>Post My Art</h1>
                    <Search></Search>
                </div>

                <div className={styles.user}>
                    <div className={styles.controls}>
                        <Button
                            title='Login'
                            type='button'
                            stylingType='outline'
                            redirectToURL={'/login'}
                        ></Button>
                        <Button
                            title='Submit'
                            type='button'
                            stylingType='generic'
                            redirectToURL={'/register'}
                        ></Button>
                    </div>
                </div>
            </div>


            <nav className={styles.nav}>
                <ul>
                    <li><a href="#" className={`${styles.active}`}>Home</a></li>
                    <li><a href="#">Browse</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>

        </div>
    );
}