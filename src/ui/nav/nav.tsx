'use client';
import Image from 'next/image';
import Search from '../search/search';
import Button from '../button/button';
import MenuIcon from '../svgs/menu';
import ProfileIcon from '../svgs/profile';
import AddIcon from '../svgs/add';
import LogoutIcon from '../svgs/logout';

import PostMyArtLogo from '../../../public/postMyArtLogo.png';

import { useState } from 'react';
import { logout } from '@/lib/actions/user';
import styles from '@/ui/nav/nav.module.css';
import { charm } from '../fonts';
import { UserData } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export default function NavBar({
    userData
}: {
    userData: UserData | null
}) {
    const router = useRouter();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenuHiddenClass = () => {
        setMenuOpen(!isMenuOpen);
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
                                <MenuIcon className={`${styles.menuIcon}`}></MenuIcon>
                            </div>
                            <div className={`${styles.menu} ${isMenuOpen ? '' : styles.hide}`}>
                                <div className={`${styles.item}`}>
                                    <ProfileIcon className={`${styles.icon}`}></ProfileIcon>
                                    <Button
                                        type='button'
                                        stylingType='userMenuItem'
                                        title='My Profile'
                                        onClick={() => router.push('/my-profile')}
                                    ></Button>
                                </div>
                                <div className={`${styles.item}`}>
                                    <AddIcon className={`${styles.icon}`}></AddIcon>
                                    <Button
                                        type='button'
                                        stylingType='userMenuItem'
                                        title='Add Art'
                                        onClick={() => console.log('TODO')}
                                    ></Button>
                                </div>
                                <div className={`${styles.item}`}>
                                    <LogoutIcon className={`${styles.icon}`}></LogoutIcon>
                                    <Button
                                        type='button'
                                        stylingType='userMenuItem'
                                        title='Logout'
                                        onClick={logout}
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
                    <li className={`${styles.listElement}`}><a className={`${styles.anchor} ${styles.active}`} href="#">Home</a></li>
                    <li className={`${styles.listElement}`}><a className={`${styles.anchor}`} href="#">Browse</a></li>
                    <li className={`${styles.listElement}`}><a className={`${styles.anchor}`} href="#">About</a></li>
                    <li className={`${styles.listElement}`}><a className={`${styles.anchor}`} href="#">Contact</a></li>
                </ul>
            </nav>

        </div>
    );
}