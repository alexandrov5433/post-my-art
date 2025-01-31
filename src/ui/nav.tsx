import styles from '@/ui/styles/nav.module.css';
import { charm } from './fonts';
import Search from './search';
import Button from './button';
import { UserData } from '@/lib/definitions';
import Image from 'next/image';
import MenuIcon from './svgs/menu';

export default function NavBar({
    userData
}: {
    userData: UserData | null
}) {
    return (
        <div className={styles.container}>

            <div className={styles.searchAndMenu}>
                <div className={styles.logoAndSearch}>
                    <h1 className={`${charm.variable} ${styles.mainTitle}`}>Post My Art</h1>
                    <Search></Search>
                </div>

                <div className={styles.user}>
                    {userData?.userID ?
                        <div className={styles.loggedIn}>
                            <div className={styles.imageContainer}>
                                <Image
                                    alt="The profile picture of the user."
                                    src={userData.profilePictureURL}
                                    width={40}
                                    height={40}
                                    className={styles.profileImg}
                                ></Image>
                            </div>
                            <div className={styles.usernameContainer}>
                                <p className={styles.username}>{userData.username}</p>
                                <MenuIcon className={`${styles.menuIcon}`}></MenuIcon>
                            </div>
                        </div>
                        : <div className={styles.controls}>
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
                    }
                </div>
            </div>


            <nav className={styles.nav}>
                <ul className={`${styles.unorderedList}`}>
                    <li className={`${styles.listElement}`}><a className={`${styles.anchor} ${styles.active}`} href="#">Home</a></li>
                    <li className={`${styles.listElement}`}><a className={`${styles.anchor}`} href="#">Browse</a></li>
                    <li className={`${styles.listElement}`}><a className={`${styles.anchor}`} href="#">About</a></li>
                    <li className={`${styles.listElement}`}><a className={`${styles.anchor}`} href="#">Contact</a></li>
                </ul>
            </nav>

        </div>
    );
}