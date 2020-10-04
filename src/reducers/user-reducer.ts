// Core
import produce, {Draft} from 'immer'
// Action
import {actionsUser} from "../actions/user-action"
// Type
import {UsersType} from "../types/types"
import {ActionsCreatorType} from "../store"
import { SearchUsersType } from "../types/user-type"


const initialState = {
    users: [] as Array<UsersType>,
    followProgress: [] as Array<number>, // users id
    searchUser: {currentPage: 1, sizePage: 20} as SearchUsersType,
    totalUsers: null as number | null,
    isLoadingUsers: false as boolean,
    viewItem: 'module' as 'module' | 'list'
}

type InitialStateType = typeof initialState
export type ActionReducerType = ActionsCreatorType<typeof actionsUser>

export const userReducer = (state: InitialStateType = initialState, action: ActionReducerType): InitialStateType  => {
    return produce(state, (draft: Draft<InitialStateType>) => {
        switch (action.type) {
            // Sync
            case "USER/FALLOWED":
                draft.users.forEach((elem, key) => {
                    if (elem.id === action.id) draft.users[key].followed = !draft.users[key].followed
                })
                break
            case "USER/SET_USERS":
                draft.users = action.users
                break
            case "USER/SET_TOTAL_USERS":
                draft.totalUsers = action.total
                break
            case "USER/SET_CURRENCY_PAGE":
                draft.searchUser.currentPage = action.page
                break
            case "USER/SET_SIZE_PAGE":
                draft.searchUser.sizePage = action.size
                break
            case "USER/SET_SEARCH_STRING_USER":
                draft.searchUser.search = action.payload.search
                break
            case "USER/SET_SEARCH_TYPE_USER":
                draft.searchUser.type = action.payload.type
                break
            case "USER/SET_VIEW_ITEM":
                draft.viewItem = action.payload
                break
            case "USER/TRIGGER_LOADING_USERS":
                draft.isLoadingUsers = action.isLoading
                break
            case "USER/FALLOW_PROGRESS":
                draft.followProgress = action.payload.progress
                break
            // Async Saga
            case "USER_WATCH_SET_USER": return state
            case "USER_WATCH_SET_FOLLOW": return state
            default:
                const allAction:never = action // check use all action
                return state
        }
    })
}
