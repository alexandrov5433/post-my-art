'use client';
import Button from '@/ui/button';
import styles from '@/ui/styles/register.module.css';
import ArrowLeft from '@/ui/svgs/arrow_left';
import Image from 'next/image';
import Link from 'next/link';

import paintingHand from '../../../public/hand-painting.png';
import goldenFrame from '../../../public/golden-frame.png';
import paintingsExhibition from '../../../public/paintings-exhibition.png';
import { useActionState, useState } from 'react';
import { register } from '@/lib/actions/user';

export default function Register() {
    const [state, formAction, pending] = useActionState(register, null);
    const [formValues, setValues] = useState({ username: '', email: '' });
    return (
        <main className={`${styles.mainContainer}`}>
            <article className={`${styles.infoContainer}`}>
                <h4 className={`${styles.infoHeading}`}>PostMyArt offers you a dedicated
                    page that you can share with your audience.</h4>
                <section className={`${styles.infoStatement}`}>
                    <Image
                        alt='A colorful hand painting with a brush.'
                        src={paintingHand}
                        className={`${styles.imageEl}`}
                    ></Image>
                    <div className={`${styles.statementWrapper}`}>
                        <h5 className={`${styles.statementTitle}`}>Profile page</h5>
                        <p className={`${styles.statement}`}>Get your own profile page featuring your biography, images, contact information, social information and more.</p>
                    </div>
                </section>
                <section className={`${styles.infoStatement}`}>
                    <Image
                        alt='A golden frame for a picture.'
                        src={goldenFrame}
                        className={`${styles.imageEl}`}
                    ></Image>
                    <div className={`${styles.statementWrapper}`}>
                        <h5 className={`${styles.statementTitle}`}>Build your gallery</h5>
                        <p className={`${styles.statement}`}>Upload your artwork to your gallery and share it online. All your art will be visible for everyone on our website.</p>
                    </div>
                </section>
                <section className={`${styles.infoStatement}`}>
                    <Image
                        alt='A wall with multiple paintings.'
                        src={paintingsExhibition}
                        className={`${styles.imageEl}`}
                    ></Image>
                    <div className={`${styles.statementWrapper}`}>
                        <h5 className={`${styles.statementTitle}`}>No limits</h5>
                        <p className={`${styles.statement}`}>There is no limits on how many art pieces you can upload on our site.</p>
                    </div>
                </section>
            </article>
            <form className={`${styles.container}`} action={formAction}>
                <section className={`${styles.titles}`}>
                    <h1 className={`${styles.wellcome}`}>Register</h1>
                    <h4 className={`${styles.signIn}`}>Sign up for FREE and share your art</h4>
                </section>

                <section className={`${styles.inputs}`}>
                    <div className={`${styles.inputContainer} ${state?.username.msg ? styles.falseInput : ''}`}>
                        <span className={`${styles.title}`}>Username</span>
                        <input className={`${styles.field}`} type="text" name="username"
                            value={formValues?.username}
                            onChange={(e) => setValues({ username: e.currentTarget.value, email: formValues.email })}
                        />
                    </div>
                    {
                        state?.username.msg ?
                            <div className={`${styles.errorContainer}`}>
                                <p className={`${styles.errorMsg}`}>{state.username.msg}</p>
                            </div>
                            : ''
                    }

                    <div className={`${styles.inputContainer} ${state?.email.msg ? styles.falseInput : ''}`}>
                        <span className={`${styles.title}`}>Email</span>
                        <input className={`${styles.field}`} type="text" name="email"
                            value={formValues?.email}
                            onChange={(e) => setValues({ username: formValues.username, email: e.currentTarget.value })}
                        />
                    </div>
                    {
                        state?.email.msg ?
                            <div className={`${styles.errorContainer}`}>
                                <p className={`${styles.errorMsg}`}>{state.email.msg}</p>
                            </div>
                            : ''
                    }

                    <div className={`${styles.inputContainer} ${state?.password.msg ? styles.falseInput : ''}`}>
                        <span className={`${styles.title}`}>Password</span>
                        <input className={`${styles.field}`} type="password" name="password" />
                    </div>
                    {
                        state?.password.msg ?
                            <div className={`${styles.errorContainer}`}>
                                <p className={`${styles.errorMsg}`}>{state.password.msg}</p>
                            </div>
                            : ''
                    }

                    <div className={`${styles.inputContainer} ${state?.repass.msg ? styles.falseInput : ''}`}>
                        <span className={`${styles.title}`}>Repeat Password</span>
                        <input className={`${styles.field}`} type="password" name="repass" />
                    </div>
                    {
                        state?.repass.msg ?
                            <div className={`${styles.errorContainer}`}>
                                <p className={`${styles.errorMsg}`}>{state?.repass.msg}</p>
                            </div>
                            : ''
                    }
                    {
                        state?.other.msg ?
                            <div className={`${styles.errorContainer}`}>
                                <p className={`${styles.errorMsg}`}>{state?.other.msg}</p>
                            </div>
                            : ''
                    }
                </section>

                <section className={`${styles.remeberMe}`}>
                    <input type="checkbox" name="rememberAccount" id="rememberMe" />
                    <span><label htmlFor="rememberMe">Remember me</label></span>
                </section>

                <section className={`${styles.formButtons}`}>
                    <Button
                        type='submit'
                        stylingType={['generic', 'loginPage', 'login']}
                        title='Register'
                        isLoading={pending}
                    ></Button>
                    <Button
                        type='button'
                        stylingType={['outline', 'loginPage', 'noAccount']}
                        title="I have an account"
                        redirectToURL={'/login'}
                        disabled={pending}
                    ></Button>
                </section>

                <section className={`${styles.backButton}`}>
                    <Link className={`${styles.anchor}`} href={'/home'}>
                        <ArrowLeft className={`${styles.arrowLeft}`}></ArrowLeft>
                        <p className={`${styles.backToHome}`}>Back to Home</p>
                    </Link>
                </section>
            </form>
        </main>
    );
}