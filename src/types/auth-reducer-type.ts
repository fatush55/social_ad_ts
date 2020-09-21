import {ContactsType, PhotosType} from "./types"

export type LoginValue = {
    password: string
    email: string
    rememberMy: boolean
    captcha: string
}

export type MyProfileDataType = {
    id?: null | number
    email?: null | string
    login?: null | string
    info?: InfoType | null
    photos?: PhotosType | null
}

export type InfoType = {
    lookingForAJob?: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    aboutMe: string | null
    contacts: ContactsType | null
}

export type AuthMeType = {
    id: number
    email: string
    login: string
}
