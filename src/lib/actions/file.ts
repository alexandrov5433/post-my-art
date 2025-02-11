'use server';
import { put, PutBlobResult } from "@vercel/blob";
import { sql } from "@vercel/postgres";

import { ArtUploadData } from "../definitions";

type UploadArtFileState =  { success: boolean | null, error: string };

export async function uploadArtFile(state: UploadArtFileState, formData: FormData) {
    try {
        const artData: ArtUploadData = {
            artOwnerID: 0,
            artPictureURL: '',
            name: '',
            description: '',
            tags: [],
        }

        const userId: number = Number(formData.get('userID') as string) || 0;
        const artName = (formData.get('name') as string) || '';
        artData.description = (formData.get('description') as string) || '';
        const artTags = (formData.get('tags') as string) || '';
        const artFile = (formData.get('artFile') as File) || '';

        if (!userId) {
            throw new Error(`Could not identify user. Surrent user ID: "${userId}".`);
        }
        // check name
        if (!artName) {
            throw new Error(`The name of the art is falsy. Art name: "${artName}".`);
        }
        if (!artFile) {
            throw new Error(`File for upload missing. File: "${artFile}".`);
        }
        artData.artOwnerID = userId;
        artData.name = artName;
        artData.tags = artTags
            .split(' ')
            .filter(t => t.length > 0)
            .map(t => `"${t}"`);

        // upload file to blob storage
        const res: PutBlobResult = await put(artFile.name, artFile, { access: 'public' });
        // add returned file url to artData
        artData.artPictureURL = res.url;

        // add artData in DB

        // res
        // {
        //     url: 'https://puyy5t4jvztfxofd.public.blob.vercel-storage.com/transparent_tree-5YN1UtDN7ORhLpA3o6ZQWYoOw0EZjK.png',
        //         downloadUrl: 'https://puyy5t4jvztfxofd.public.blob.vercel-storage.com/transparent_tree-5YN1UtDN7ORhLpA3o6ZQWYoOw0EZjK.png?download=1',
        //             pathname: 'transparent_tree.png',
        //                 contentType: 'image/png',
        //                     contentDisposition: 'inline; filename="transparent_tree.png"'
        // }
        // artData
        // {
        //     artOwnerID: 4,
        //         artPictureURL: 'https://puyy5t4jvztfxofd.public.blob.vercel-storage.com/transparent_tree-5YN1UtDN7ORhLpA3o6ZQWYoOw0EZjK.png', name: 'Testing Art Name',
        //             description: '',
        //                 tags: []
        // }
        await sql`
            INSERT INTO "Art" VALUES (
            DEFAULT,
            ${res.url},
            ${artData.artOwnerID},
            ${artData.name},
            ${artData.description},
            ${artData.tags.length ? `{${artData.tags.join(', ')}}`: 'DEFAULT'},
            DEFAULT,
            DEFAULT
            )`;

        // redirect user on client
        return {
            success: true,
            error: ''
        } as UploadArtFileState;
    } catch (err) {
        return {
            success: false,
            error: (err as Error).message
        } as UploadArtFileState;
    }
}