// Type
import { RootState } from "../store"


export const getIsAuth = (store: RootState) => store.auth.isAuth
export const getMyProfile = (store: RootState) => store.auth.myProfile
export const getCaptcha = (store: RootState) => store.auth.captcha
