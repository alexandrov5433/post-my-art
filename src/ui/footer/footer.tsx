import Link from 'next/link';

import { UserData } from '@/lib/definitions';
import styles from '@/ui/footer/footer.module.css';
import ProfileIcon from '../svgs/profile';
import LinkedinIcon from '../svgs/linkedin';
import DiscordIcon from '../svgs/discord';
import GithubIcon from '../svgs/github';

export default function Footer({
    userData
}: {
    userData: UserData | null
}) {
    return (
        <div className={`${styles.allContainer}`}>
            <section className={`${styles.content}`}>
                <article className={`${styles.about}`}>
                    <h4 className={`${styles.title}`}>About Us</h4>
                    <p className={`${styles.paragraph}`}>Post My Art is a virtual platform that helps artists publish their art work for free using innovative tools. Post My Art lets you expose your arts via the Web, a virtual world platform, accessible through any devices.</p>
                    <p className={`${styles.paragraph}`}>It offers you a personal gallery that and allows you to display your art works through an intuitive interface.</p>
                </article>
                <article className={`${styles.useful}`}>
                    <h4 className={`${styles.title}`}>Useful Links</h4>
                    <ul>
                        <li className={`${styles.usefulLink}`}><Link href="/contact-us">Contact Us</Link></li>
                        <li className={`${styles.usefulLink}`}><Link href="/about">About</Link></li>
                        {
                            userData === null ?
                                <li className={`${styles.usefulLink}`}><Link href="/login">Login</Link></li>
                                : ''
                        }
                        {
                            userData === null ?
                                <li className={`${styles.usefulLink}`}><Link href="/register">Rgister</Link></li>
                                : ''
                        }
                        <li className={`${styles.usefulLink}`}><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
                        <li className={`${styles.usefulLink}`}><Link href="/privacy">Privacy Policy</Link></li>
                    </ul>
                </article>
                <article className={`${styles.social}`}>
                    <h4 className={`${styles.title}`}>Social Links</h4>
                    <div className={`${styles.socialLinksContainer}`}>
                        <Link href="https://www.linkedin.com/in/aleksandar-darakev-4094b8347/" className={`${styles.socialLink}`}>
                            <div className={`${styles.linkContent}`}>
                                <LinkedinIcon className={`${styles.linkIcon}`}></LinkedinIcon>
                                <p className={`${styles.linkText}`}>LinkedIn</p>
                            </div>
                        </Link>
                        <Link href="https://discord.com/users/249272078421852161" className={`${styles.socialLink}`}>
                            <div className={`${styles.linkContent}`}>
                                <DiscordIcon className={`${styles.linkIcon}`}></DiscordIcon>
                                <p className={`${styles.linkText}`}>Discord</p>
                            </div>
                        </Link>
                        <Link href="https://github.com/alexandrov5433" className={`${styles.socialLink}`}>
                            <div className={`${styles.linkContent}`}>
                                <GithubIcon className={`${styles.linkIcon}`}></GithubIcon>
                                <p className={`${styles.linkText}`}>GitHub</p>
                            </div>
                        </Link>
                    </div>
                </article>
            </section>
            <section className={`${styles.copyright}`}>
                <p className={`${styles.paragraph}`}>&copy; All Rights Reserved by post-my-art.vercel.app</p>
                <Link href="https://github.com/alexandrov5433"><p className={`${styles.paragraph} ${styles.link}`}>Developed by Alex</p></Link>
                <p className={`${styles.paragraph}`}>The visuals of this website are inspired by <Link href="https://www.showyourarts.com/" className={`${styles.link}`}>showyourarts.com</Link>. The creator of Post My Art does not claim any rights on <Link href="https://www.showyourarts.com/">showyourarts.com</Link></p>
            </section>
        </div>
    );
}