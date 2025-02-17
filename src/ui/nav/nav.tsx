'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import Search from '../search/search';
import Button from '../button/button';
import PostMyArtLogo from '../../../public/postMyArtLogo.png';

import { useState, useContext } from 'react';
import { logout } from '@/lib/actions/user';
import styles from '@/ui/nav/nav.module.css';
import { UserDataContext } from '@/lib/context/userDataContext';

export default function NavBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenuHiddenClass = () => {
        setMenuOpen(!isMenuOpen);
    }
    const pathname = usePathname();
    const userDataContext = useContext(UserDataContext);
    const userData = userDataContext.userData;
    const router = useRouter();
    const onLogout = async () => {
        await logout();
        userDataContext.setTriggerUserDataRefresh(!userDataContext.userDataRefreshTrigger);
        router.push('/home');
    }
    return (
        <div className={styles.container}>

            <div className={styles.searchAndMenu}>
                <div className={styles.logoAndSearch}>
                    <Image
                        src={PostMyArtLogo}
                        width={200}
                        height={50}
                        alt="The Post My Art logo."
                        className={styles.logo}
                    ></Image>
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
                                <Button
                                    type='button'
                                    stylingType='userMenu'
                                    title={userData.username}
                                    onClick={toggleMenuHiddenClass}
                                ></Button>
                                <FontAwesomeIcon icon={faBars} className={`${styles.menuIcon}`} />
                            </div>
                            <div className={`${styles.menu} ${isMenuOpen ? '' : styles.hide}`}>
                                <div className={`${styles.item}`}>
                                    <FontAwesomeIcon icon={faUser} className={`${styles.icon}`} />
                                    <Button
                                        type='button'
                                        stylingType='userMenuItem'
                                        title='My Profile'
                                        redirectToURL='/my-profile'
                                    ></Button>
                                </div>
                                <div className={`${styles.item}`}>
                                    <FontAwesomeIcon icon={faPlus} className={`${styles.icon}`} />
                                    <Button
                                        type='button'
                                        stylingType='userMenuItem'
                                        title='Add Art'
                                        redirectToURL='/add-art'
                                    ></Button>
                                </div>
                                <div className={`${styles.item}`}>

                                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={`${styles.icon}`} />
                                    <Button
                                        type='button'
                                        stylingType='userMenuItem'
                                        title='Logout'
                                        onClick={onLogout}
                                    ></Button>
                                </div>
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
                    <li className={`${styles.listElement}`}>
                        <Link className={`${styles.anchor} ${pathname === '/home' ? styles.active : ''}`} href="/home">Home</Link>
                    </li>
                    <li className={`${styles.listElement}`}>
                        <Link className={`${styles.anchor} ${pathname === '/browse' ? styles.active : ''}`} href="/browse">Browse</Link>
                    </li>
                    <li className={`${styles.listElement}`}>
                        <Link className={`${styles.anchor} ${pathname === '/about' ? styles.active : ''}`} href="/about">About</Link>
                    </li>
                    <li className={`${styles.listElement}`}>
                        <Link className={`${styles.anchor} ${pathname === '/contact' ? styles.active : ''}`} href="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}