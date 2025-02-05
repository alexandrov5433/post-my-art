'use client';
import { useState, useRef, use, Suspense } from 'react';

import { UserData, ArtUploadData } from '@/lib/definitions';
import styles from '@/ui/addArt/add-art.module.css';
import Button from '../button/button';

import { uploadArtFile } from '@/lib/actions/file';
import { PutBlobResult } from '@vercel/blob';

const FILE_SIZE_LIMIT: number = 2100000 //2MB (2097152) rounded up

export default function AddArt({
    userData
}: {
    userData: UserData
}) {
    const [charsLeft, setCharsLeft] = useState(100);
    const [errorState, setErrorState] = useState({
        name: false,
        file: false,
        other: ''
    });
    const [isUploadInProgressState, setUploadProgressState] = useState(false);
    const [selectedFileNameState, setSelectedFileNameState] = useState('No File Selected!');
    const formRef = useRef(null);
    // const uploadedFileNameInputRef = useRef(null);

    const calcCharsLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = (e.nativeEvent as InputEvent).inputType;
        if (!charsLeft && !inputType.includes('deleteContent')) {
            //remove added char
            const val = e.currentTarget.value;
            e.currentTarget.value = val.slice(0, val.length - 1);
        }
        setCharsLeft(100 - e.currentTarget.value.length);
    };

    const fileCheckAndDisplayFileName = () => {
        
        
        const formData = new FormData(formRef.current! as HTMLFormElement);
        const artFile = (formData.get('artFile') as File) || '';
        let fileErrors = [
            (artFile as File).size > FILE_SIZE_LIMIT ? true : false,
            !['image/jpeg', 'image/png'].includes((artFile as File).type)
        ];
        console.log('fileErrors', fileErrors);
        
        setErrorState({
            name: errorState.name,
            file: fileErrors.includes(true), //state is not beeing set...why??? always goes in else block
            other: errorState.other
        })
        console.log('errorState', errorState);
        if (errorState.file) {
            console.log('if block');
            console.log('errorState.file', errorState.file);
            // error; clear name
            setSelectedFileNameState('No File Selected!');
        } else {
            console.log('else block');
            // no errors; set name
            setSelectedFileNameState(artFile.name);
        }
    }

    const submitArt = () => {
        setUploadProgressState(true);
        const artData: ArtUploadData = {
            artOwnerID: Number(userData.userID),
            artPictureURL: '',
            name: '',
            description: '',
            tags: [],
        }
        const formData = new FormData(formRef.current! as HTMLFormElement);

        const artName = (formData.get('name') as string) || '';
        artData.description = (formData.get('description') as string) || '';
        const artTags = (formData.get('tags') as string) || '';
        const artFile = (formData.get('artFile') as File) || '';

        // check file and name
        setErrorState({
            name: Boolean(artName),
            file: errorState.file,
            other: errorState.other
        })
        fileCheckAndDisplayFileName();
        if (errorState.name || errorState.file) {
            return;
        }
        artData.name = artName;
        // upload file to blob storage
        try {
            const res: PutBlobResult = use(uploadArtFile(artFile));
            // add returned file url to artData
            artData.artPictureURL = res.url;
        } catch (err) {
            console.log('Error data\n', err);
            
            setErrorState({
                name: errorState.name,
                file: errorState.file,
                other: `${(err as Error).message}`
            })
            setUploadProgressState(false);
            return;
        }
        // process tags
        artData.tags = artTags
            .split(' ')
            .filter(t => t.length > 0) || [];

        console.log('artData\n', artData);
        

        // add artData in DB
        // redirect user
        setUploadProgressState(false);

    };





    return (
        <main className={`${styles.mainWrapper}`}>

            <h1>Upload Your Art</h1>
            <form ref={formRef} className={`${styles.uploadForm}`}>

                <div className={`${styles.inputSection}`}>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Enter the name of your Art' id='name' name='name' onChange={calcCharsLeft} className={`${styles.inputElement} ${errorState.name ? styles.falseInput : ''}`} />
                    <p>Characters left: {charsLeft}</p>
                    {
                        errorState.name ?
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
                    <input type="file" id='artFile' name='artFile' className={`${styles.artFileInput}`} onChange={fileCheckAndDisplayFileName}/>
                    {/* hidden */}
                    <input type="text" className={`${styles.inputElement} ${errorState.file ? styles.falseInput : ''}`} readOnly value={selectedFileNameState} />
                    {
                        errorState.file ?
                            <p className={`${styles.errorMessage}`}>File must be 2MB or less and be of type .JPG/.JPEG or.PNG!</p>
                            : ''
                    }
                    <p className={`${styles.note}`}>Note: Only files of type .JPG/.JPEG or.PNG, with a maximum size of 2MB can be uploaded.</p>
                </div>

                {
                    errorState.other ?
                        <div className={`${styles.inputSection}`}>
                            <p className={`${styles.errorMessage}`}>{errorState.other}</p>
                        </div>
                        : ''
                }

                <div className={`${styles.submitButtonContainer}`}>
                    <Suspense fallback={<p>Uploading Art...</p>}>
                        <Button
                            type='button'
                            stylingType='generic'
                            title='Upload Art'
                            onClick={submitArt}
                            isLoading={isUploadInProgressState}
                        ></Button>
                    </Suspense>
                </div>

            </form>

        </main>
    );
}