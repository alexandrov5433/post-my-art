'use client';
import { useState, useRef, ChangeEventHandler, SyntheticEvent } from 'react';

import { UserData } from '@/lib/definitions';
import styles from '@/ui/addArt/add-art.module.css';

export default function AddArt({
    userData
}: {
    userData: UserData
}) {
    const [charsLeft, setCharsLeft]  = useState(100);
    const [nameInputBlocked, setNameInputBlocked] = useState(false);
    const calcCharsLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        const inputType = (e.nativeEvent as InputEvent).inputType;
        console.log(inputType);
        if (!inputType.includes('deleteContent')) {
            if (charsLeft) {
                setCharsLeft(100 - e.currentTarget.value.length);
                setNameInputBlocked(false);
            } else {
                setNameInputBlocked(true);
            }
        }
    };
    return (
        <main className={`${styles.mainWrapper}`}>
            <section className={`${styles.imageSection}`}>

            </section>
            <section className={`${styles.uploadSection}`}>
                <h1>Upload Art</h1>
                <form action="">
                    <div>
                        <label htmlFor="nameInput"></label>
                        <input type="text" id="nameInput" onChange={calcCharsLeft}/>
                        <p>Characters left: {charsLeft}</p>
                    </div>
                </form>
            </section>
        </main>
    );
}