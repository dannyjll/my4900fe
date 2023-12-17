export interface Profile {
    pk: number,
    user: number,
    bio: string,
    image: any,    
    private: boolean,
}

export interface ProfileList {
    data?: Profile[]
}