'use client';
import styles from '@/ui/button/button.module.css';

import { useRouter } from 'next/navigation';
import { PopupMessageContext } from '../popupMessage/popupMessageContext';
import { useContext } from 'react';

import Loader from '../loader/loader';


export default function Button({
    title,
    type,
    stylingType,
    redirectToURL = null,
    onClick = null,
    disabled = false,
    isLoading = false,
    msgTest = false
}: {
    title: string,
    type: 'button' | 'submit',
    stylingType: 'generic' | 'outline' | 'follow' | 'userMenu' | 'userMenuItem' | string[],
    redirectToURL?: string | null,
    onClick?: (() => any) | null,
    disabled?: boolean,
    isLoading?: boolean,
    msgTest?: boolean //TODO delete after testing
}) {
    const router = useRouter();
    const messageContext = useContext(PopupMessageContext)
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
            onClick={async () => {
                if (onClick) {
                    await onClick();
                }
                if (redirectToURL) {
                    router.push(redirectToURL);
                }
                if (msgTest) {
                    messageContext.setMessageData({
                        duration: 3000,
                        isShown: true,
                        text: `${Math.random() * 100}`,
                        type: 'success'
                    });
                }
            }}
            disabled={disabled || isLoading}
        >{isLoading ? <Loader></Loader> : title}</button>
    );
}