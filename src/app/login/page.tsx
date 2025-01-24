import Button from '@/ui/button';
import styles from '@/ui/styles/login.module.css';
import ArrowLeft from '@/ui/svgs/arrow_left';

export default function Login() {
    return (
        <main className={`${styles.mainContainer}`}>
            <form className={`${styles.container}`}>
                <section className={`${styles.titles}`}>
                    <h1>Welcome!</h1>
                    <h4>Sign in to show your arts</h4>
                </section>
                <section className={`${styles.inputs}`}>
                    <div>
                        <span>Username</span>
                        <input className={`${styles.field}`} type="text" name="username" />
                    </div>
                    <div>
                        <span>Password</span>
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
                    ></Button>
                </section>
                <section className={`${styles.backButton}`}>
                    <ArrowLeft className={`${styles.arrowLeft}`}></ArrowLeft>
                    <p>Back to Home</p>
                </section>
            </form>
        </main>
    );
}