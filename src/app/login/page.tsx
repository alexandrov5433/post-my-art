
import Button from '@/ui/button';
import styles from '@/ui/styles/login.module.css';
import ArrowLeft from '@/ui/svgs/arrow_left';
import Link from 'next/link';

export default function Login() {
    return (
        <main className={`${styles.mainContainer}`}>
            <form className={`${styles.container}`}>
                <section className={`${styles.titles}`}>
                    <h1 className={`${styles.wellcome}`}>Welcome!</h1>
                    <h4 className={`${styles.signIn}`}>Sign in to post your arts</h4>
                </section>
                <section className={`${styles.inputs}`}>
                    <div className={`${styles.inputContainer}`}>
                        <span className={`${styles.title}`}>Username</span>
                        <input className={`${styles.field}`} type="text" name="username" />
                    </div>
                    <div className={`${styles.inputContainer}`}>
                        <span className={`${styles.title}`}>Password</span>
                        <input className={`${styles.field}`} type="password" name="password" />
                    </div>
                </section>
                <section className={`${styles.remeberMe}`}>
                    <input type="checkbox" name="rememberAccount" />
                    <span>Remember me</span>
                </section>
                <section className={`${styles.formButtons}`}>
                    <Button
                        type='submit'
                        stylingType={['generic', 'loginPage', 'login']}
                        title='Login'
                    ></Button>
                    <Button
                        type='button'
                        stylingType={['outline', 'loginPage', 'noAccount']}
                        title="Don't have an account yet?"
                        redirectToURL={'/register'}
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