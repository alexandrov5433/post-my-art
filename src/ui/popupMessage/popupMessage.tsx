'use client';
import { useContext, useEffect, useState } from "react";

import { PopupMessageContext } from "../../lib/context/popupMessageContext";

import styles from '@/ui/popupMessage/popupMessage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function PopupMessage() {
    const messageContext = useContext(PopupMessageContext);
    const [showMsg, setShowMsg] = useState(false);
    useEffect(() => {
        setShowMsg(messageContext.messageData.isShown);
        const timeSetter = setTimeout(() => {
            setShowMsg(false);
        }, messageContext.messageData.duration);
        return () => clearTimeout(timeSetter);
    }, [messageContext.messageData]);
    return (
        <dialog open={showMsg} className={styles.wrapper}>

            <div className={`${styles.content} ${styles[messageContext.messageData.type]}`}>

                <div className={styles.textContent}>
                    <h5 className={styles.title}>
                        {
                            {
                                success: 'Success!',
                                error: 'Opps...!',
                                neutral: ''
                            }[messageContext.messageData.type]
                        }
                    </h5>
                    <p className={styles.message}>{messageContext.messageData.text}</p>
                </div>

                <div className={styles.buttonContainer}>
                    <button onClick={() => setShowMsg(false)} className={styles.buttonElem}>
                        <FontAwesomeIcon icon={faXmark} className={styles.buttonIcon}></FontAwesomeIcon>
                    </button>
                </div>

            </div>

        </dialog>
    );
}