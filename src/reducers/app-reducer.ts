// Action
import { actionsApp } from "../actions/app-action"
// Type
import { AlertType, HiddenAlertType } from "../types/app-reducet-type"
import { ActionsCreatorType } from "../store"


const initialState = {
    initialize: false as boolean,
    currentProfile: null as null | number,
    alert: null as null | AlertType,
    hiddenAlert: null as HiddenAlertType,
    theme: true as boolean,
    drawerMode: true as boolean,
    defaultAvatarUsers: 'https://img.cinemablend.com/filter:scale/quill/7/b/0/f/8/a/7b0f8a4adb090171ee6a3823041db28a3e7b5d49.png?mw=600'
}

type InitialStateType = typeof initialState
export type ActionReducerType = ActionsCreatorType<typeof actionsApp>

export const appReducer = (state: InitialStateType = initialState, action: ActionReducerType): InitialStateType => {
    switch (action.type) {
        case "APP/SET_INITIALIZE":
            return {
                ...state,
                initialize: true,
            }
        case "APP/SET_CURRENT_PROFILE":
            return {
                ...state,
                currentProfile: action.id,
            }
        case "APP/SET_ALERT":
            return {
                ...state,
                alert: action.payload,
            }
        case "APP/SET_HIDDEN_ALERT":
            return {
                ...state,
                hiddenAlert: action.payload,
            }
        case "APP/SET_THEME":
            return {
                ...state,
                theme: action.payload,
            }
        case "APP/SET_DRAWER_MODE":
            return {
                ...state,
                drawerMode: action.payload,
            }
        default: return state
    }
}
