// Type
import { AlertType } from "../types/app-reducet-type";
import {UsersType} from "../types/types";


export const actionsApp = {
    triggerInitialize: () => ({type: 'APP/SET_INITIALIZE'} as const),
    setCurrentProfile: (id: number) => ({type: 'APP/SET_CURRENT_PROFILE', id} as const),
    setAlert: (payload: AlertType | null) => ({type: 'APP/SET_ALERT', payload} as const),
    setTheme: (payload: boolean) => ({type: 'APP/SET_THEME', payload} as const),
    setDrawerMode: (payload: boolean) => ({type: 'APP/SET_DRAWER_MODE', payload} as const),
    setHiddenAlert: (payload: null | 'show' | 'hide') => ({type: 'APP/SET_HIDDEN_ALERT', payload} as const),
    setFallowingUserProfile: (users: Array<UsersType>) => ({type: 'APP/SET_FOLLOWING_USER_PROFILE', payload: {users}} as const),
}
