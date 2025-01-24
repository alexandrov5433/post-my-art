'use client';
import styles from '@/ui/styles/button.module.css';
import { useRouter } from 'next/navigation';


export default function Button({
    title,
    type,
    stylingType,
    redirectToURL = null
}: {
    title: string,
    type: 'button' | 'submit',
    stylingType: 'generic' | 'outline' | 'follow' | string[],
    redirectToURL?: string | null,
}) {
    const router = useRouter();
    return (
        <button
            className={
                stylingType instanceof Array ?
                    `${styles.btn}${
                        (stylingType.map(cl => ` ${styles[cl]}`)).join('')
                    }`
                    : `${styles.btn} ${styles[stylingType]}`
            }
            type={type}
            onClick={() => {
                if (redirectToURL) {
                    router.push(redirectToURL);
                }
            }}
        >{title}</button>
    );
}