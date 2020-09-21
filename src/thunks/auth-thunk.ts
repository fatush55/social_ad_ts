// Api
import {profileApi} from "../api/profile-api"
import {authApi} from "../api/auth-api"
import {securityApi} from "../api/security-api"
// Action
import {actionsAuth} from "../actions/auth-action"
// Thunk
import {setFollowingUserProfile} from "./app-thunk"
// Type
import {RootThunkCreatorType} from "../store"
import {LoginValue} from "../types/auth-reducer-type"
import {ResponseResultCodeForCaptchaType, ResponseResultCodeType} from "../api/api"
import {ActionReducerType} from "../reducers/auth-reducer"


type ThunkCreatorType = RootThunkCreatorType<ActionReducerType>

export const getAuth = (): ThunkCreatorType => async (dispatch) => {
    const dataAuth = await authApi.getMe()

    if (dataAuth.resultCode === ResponseResultCodeType.success) {
        const {userId, photos, ...restData} = await profileApi.getProfile(dataAuth.data.id)
        const profile = { ...dataAuth.data, photos, info: {...restData}}

        dispatch(actionsAuth.setMyProfile(profile))
        dispatch(actionsAuth.triggerIsAuth(true))
    }
    return Promise.all([dataAuth]);
}

export const login = ({email, password, rememberMy, captcha}: LoginValue): ThunkCreatorType => async (dispatch) => {
    const data = await authApi.login(email, password, rememberMy = false, captcha)

    if (data.resultCode === ResponseResultCodeType.success) {
        dispatch(getAuth())
        dispatch(setFollowingUserProfile())
        dispatch(actionsAuth.setCaptcha(''))
    } else if (data.resultCode === ResponseResultCodeForCaptchaType.isCaptcha) {
        const dataCaptcha = await securityApi.getCaptcha()

        dispatch(actionsAuth.setCaptcha(dataCaptcha.url))
        return await data.messages
    } else if (data.resultCode === ResponseResultCodeType.error) {
        return await data.messages
    }
}

export const logout = (): ThunkCreatorType => async (dispatch) => {
    const data = await authApi.logout()
    if (data.resultCode === ResponseResultCodeType.success) dispatch(actionsAuth.setLogOut())
}
