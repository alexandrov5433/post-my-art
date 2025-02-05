'use client';
import { useState, useRef, ChangeEventHandler, SyntheticEvent } from 'react';

import { UserData } from '@/lib/definitions';
import styles from '@/ui/addArt/add-art.module.css';

export default function AddArt({
    userData
}: {
    userData: UserData
}) {
    const [charsLeft, setCharsLeft] = useState(100);
    const [nameInputBlocked, setNameInputBlocked] = useState(false);
    const calcCharsLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = (e.nativeEvent as InputEvent).inputType;
        if (!charsLeft && !inputType.includes('deleteContent')) {          
            //remove added char
            const val = e.currentTarget.value;
            e.currentTarget.value = val.slice(0, val.length - 1);
        }
        setCharsLeft(100 - e.currentTarget.value.length);
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
                        <input type="text" onChange={calcCharsLeft} />
                        <p>Characters left: {charsLeft}</p>
                    </div>
                </form>
            </section>
        </main>
    );
}