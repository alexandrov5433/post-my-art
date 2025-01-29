'use client';
import Button from '@/ui/button';
import styles from '@/ui/styles/login.module.css';
import ArrowLeft from '@/ui/svgs/arrow_left';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { login } from '@/lib/actions/user';

export default function Login() {
    const [state, formAction, pending] = useActionState(login, null);
    const [formValues, setValues] = useState({ username: null });
    return (
        <main className={`${styles.mainContainer}`}>
            <form className={`${styles.container}`} action={formAction}>
                <section className={`${styles.titles}`}>
                    <h1 className={`${styles.wellcome}`}>Welcome!</h1>
                    <h4 className={`${styles.signIn}`}>Sign in to post your arts</h4>
                </section>
                <section className={`${styles.inputs}`}>

                    <div className={`${styles.inputContainer} ${state?.username.msg ? styles.falseInput : ''}`}>
                        <span className={`${styles.title}`}>Username</span>
                        <input className={`${styles.field}`} type="text" name="username" />
                    </div>
                    {
                        state?.username.msg ?
                            <div className={`${styles.errorContainer}`}>
                                <p className={`${styles.errorMsg}`}>{state?.username.msg}</p>
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
                                <p className={`${styles.errorMsg}`}>{state?.password.msg}</p>
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
                        title='Login'
                        disabled={pending}
                        isLoading={pending}
                    ></Button>
                    <Button
                        type='button'
                        stylingType={['outline', 'loginPage', 'noAccount']}
                        title="Don't have an account yet?"
                        redirectToURL={'/register'}
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