// Type
import {MyProfileDataType} from "../types/auth-reducer-type"

export const actionsAuth = {
    setMyProfile: (profile: MyProfileDataType) => ({type: 'AUTH/SET_MY_PROFILE', payload: {profile}} as const ),
    setLogOut: () => ({type: 'AUTH/SET_LOG_OUT'} as const ),
    setCaptcha: (url: string) => ({type: 'AUTH/SET_CAPTCHA', url} as const ),
    triggerIsAuth: (isAuth: boolean) => ({type: 'AUTH/TRIGGER_AUTH', isAuth} as const ),
}
