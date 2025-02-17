import { Dispatch, SetStateAction } from "react"


export interface ArtCardData {
    artName: string,
    artId: string,
    artUrl: string,
    artTags: string[],
    userName: string,
    userId: string,
    profilePictureUrl: string,
    likesCount: number,
    commentsCount: number,
    isInFavorites: boolean
}

export interface RegisterData {
    username: string,
    email: string,
    password: string,
    profilePictureURL: string,
}

export interface UserData {
    userID: number,
    username: string,
    email: string,
    password: string,
    favoriteArts: number[],
    followedArtists: number[],
    postedArts: number[],
    profilePictureURL: string,
    country: string | null,
    instagramURL: string | null,
    facebookURL: string | null,
    exURL: string | null,
    publicEmail: string | null,
    userDescription: string | null
}

export interface ArtUploadData {
    artOwnerID: number,
    artPictureURL: string,
    name: string,
    description: string,
    tags: Array<string>,
}

export interface PopupMessageContextData {
    messageData: MessageData,
    setMessageData: Dispatch<SetStateAction<MessageData>>
}

export type MessageData = {
    isShown: boolean,
    text: string,
    type: 'success' | 'error' | 'neutral',
    duration: number
}

export interface UserDataContextData {
    userData: UserData | null,
    userDataRefreshTrigger: boolean,
    setTriggerUserDataRefresh: Dispatch<SetStateAction<boolean>>
};