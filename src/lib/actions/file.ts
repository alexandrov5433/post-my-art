'use server';
import { put } from "@vercel/blob";

export async function uploadArtFile(file: File) {
    return await put(file.name, file, { access: 'public' });
}