'use client';
import { useState, useRef, Suspense, useEffect, useActionState, useContext } from 'react';

import { useRouter } from 'next/navigation';

import { UserData, ArtUploadData } from '@/lib/definitions';
import styles from '@/ui/addArt/add-art.module.css';
import Button from '../button/button';

import { uploadArtFile } from '@/lib/actions/file';
import { PopupMessageContext } from '../popupMessage/popupMessageContext';

const FILE_SIZE_LIMIT: number = 2100000 //2MB (2097152) rounded up

export default function AddArt({
    userData
}: {
    userData: UserData
}) {
    const [charsLeft, setCharsLeft] = useState(100);
    const [nameError, setNameError] = useState(false);
    const [nameUntouched, setNameUntouched] = useState(true);
    const [fileError, setFileError] = useState(false);
    const [fileUntouched, setfileUntouched] = useState(true);
    const [selectedFileNameState, setSelectedFileNameState] = useState('No File Selected!');

    const formRef = useRef(null);
    const uploadedFileHiddenInputRef = useRef(null);

    const messageContext = useContext(PopupMessageContext);
    const router = useRouter();

    const calcCharsLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = (e.nativeEvent as InputEvent).inputType;
        if (!charsLeft && !inputType.includes('deleteContent')) {
            //remove added char
            const val = e.currentTarget.value;
            e.currentTarget.value = val.slice(0, val.length - 1);
        }
        setCharsLeft(100 - e.currentTarget.value.length);
    };

    const checkName = () => {
        const formData = new FormData(formRef.current! as HTMLFormElement);
        const artName = (formData.get('name') as string) || '';
        setNameError(!Boolean(artName));
        setNameUntouched(false);
    };

    const nameInputOnChangeListeners = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkName();
        calcCharsLeft(e);
    };

    const resetHiddenInputValue = () => {
        (uploadedFileHiddenInputRef.current as unknown as HTMLInputElement).value = '';
    };

    const fileCheckAndDisplayFileName = () => {
        try {
            setfileUntouched(false);
            const formData = new FormData(formRef.current! as HTMLFormElement);
            const artFile = (formData.get('artFile') as File) || '';
            if (!artFile) {
                throw null;
            }
            let fileErrors = [
                (artFile as File).size > FILE_SIZE_LIMIT ? true : false,
                !['image/jpeg', 'image/png'].includes((artFile as File).type)
            ];
            setFileError(fileErrors.includes(true));
            if (fileErrors.includes(true)) {
                // error; clear name
                throw null;
            }
            // no errors; set name
            setSelectedFileNameState(artFile.name);
        } catch (err) {
            // error; clear name and reset file input value
            resetHiddenInputValue();
            setSelectedFileNameState('No File Selected!');
        }
    }

    const [state, formAction, isPending] = useActionState(uploadArtFile, { success: null, error: '' });
    console.log(state);

    useEffect(() => {
        console.log(state);
        if (state.success) {
            messageContext.setMessageData({
                duration: 3000,
                isShown: true,
                text: 'Art piece uploaded!',
                type: 'success'
            });
            router.push('/home');
        }
    }, [state]);

    return (
        <main className={`${styles.mainWrapper}`}>

            <h1 className={`${styles.title}`}>Upload Your Art</h1>
            <form ref={formRef} className={`${styles.uploadForm}`} action={formAction}>

                <div className={`${styles.inputSection}`}>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Enter the name of your Art' id='name' name='name' onChange={nameInputOnChangeListeners} className={`${styles.inputElement} ${nameError ? styles.falseInput : ''}`} />
                    <p className={`${styles.generalParagraph}`}>Characters left: {charsLeft}</p>
                    {
                        nameError ?
                            <p className={`${styles.errorMessage}`}>Name is missing!</p>
                            : ''
                    }
                </div>

                <div className={`${styles.inputSection}`}>
                    <label htmlFor="description">Description</label>
                    <textarea id='description' name='description' placeholder='Enter a description' className={`${styles.inputElement} ${styles.description}`} />
                </div>

                <div className={`${styles.inputSection}`}>
                    <label htmlFor="tag">Tags</label>
                    <input type="text" name='tags' placeholder='nature sun outdoorWalks green' id='tag' className={`${styles.inputElement}`} />
                    <p className={`${styles.note}`}>Note: Enter all tags by separating them with a space. Example: "nature sun outdoorWalks green".</p>
                </div>

                <div className={`${styles.inputSection}`}>
                    <label htmlFor="artFile">Art</label>
                    <label htmlFor="artFile" className={`${styles.artSecondLabel}`}>Select File</label>
                    {/* hidden */}
                    <input type="file" id='artFile' name='artFile' className={`${styles.artFileInput}`} onChange={fileCheckAndDisplayFileName} ref={uploadedFileHiddenInputRef} />
                    <input type="text" name='userID' value={userData.userID} className={`${styles.artFileInput}`} readOnly />
                    {/* hidden */}
                    <input type="text" className={`${styles.inputElement} ${fileError ? styles.falseInput : ''}`} readOnly value={selectedFileNameState} />
                    {
                        fileError ?
                            <p className={`${styles.errorMessage}`}>File must be 2MB or less and be of type .JPG/.JPEG or.PNG!</p>
                            : ''
                    }
                    <p className={`${styles.note}`}>Note: Only files of type .JPG/.JPEG or.PNG, with a maximum size of 2MB can be uploaded.</p>
                </div>

                {
                    state.error ?
                        <div className={`${styles.inputSection}`}>
                            <p className={`${styles.errorMessage}`}>{state.error}</p>
                        </div>
                        : ''
                }

                <div className={`${styles.submitButtonContainer}`}>
                    <Button
                        type='submit'
                        stylingType='generic'
                        title='Upload Art'
                        isLoading={isPending}
                        disabled={nameError || fileError || nameUntouched || fileUntouched}
                    ></Button>
                </div>

            </form>

        </main>
    );
}