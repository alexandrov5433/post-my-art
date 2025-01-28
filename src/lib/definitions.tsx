

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