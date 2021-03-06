// Api
import {userApi} from "../api/user-api"
// Action
import {actionsUser} from "../actions/user-action"
// Type
import {RootThunkCreatorType} from "../store"
import {ResponseResultCodeType} from "../api/api"
import {ActionReducerType} from "../reducers/user-reducer"
import {updateFollowingUserProfile} from "./app-thunk"


type ThunkCreatorType = RootThunkCreatorType<ActionReducerType>

type RequestUsersType = {
    currentPage: number
    sizePage: number
    search: string
    type: 'all' | 'follow' | 'other'
}

export const requestUsers = (action: RequestUsersType): ThunkCreatorType => async (dispatch) => {
    dispatch(actionsUser.triggerLoadingUsers(true))

    const data = await userApi.getUsers(action)

    dispatch(actionsUser.setUsers(data.items))
    dispatch(actionsUser.setTotalUsers(data.totalCount))
    dispatch(actionsUser.triggerLoadingUsers(false))
}

export const setFollow = (id: number, users: Array<any>): ThunkCreatorType => async (dispatch) => {
    const item = users.find((elem) => elem.id === id)
    const isFollowing = item.followed ? 'unFollow' : 'follow'

    dispatch(updateFollowingUserProfile(item, item.followed ? 'remove' : 'add'))

    // dispatch(actionsUser.triggerFollowProgress(id, true))
    const data = await userApi.setFollowed(isFollowing, id)

    if (data.resultCode === ResponseResultCodeType.success) {
        dispatch(actionsUser.fallowUser(id))
        // dispatch(actionsUser.triggerFollowProgress(id, false))
    }
}

export const setCurrencyPageUser = (page: number): ThunkCreatorType => (dispatch) => {
    dispatch(actionsUser.setCurrencyPage(page))
}

export const setSizePageUser = (size: number): ThunkCreatorType => (dispatch) => {
    dispatch(actionsUser.setSizePage(size))
}

export const setSearchUser = (search: string): ThunkCreatorType => (dispatch) => {
    dispatch(actionsUser.setSearchStringUser(search))
}

export const setSearchTypeUser = (type: 'all' | 'follow' | 'other'): ThunkCreatorType => (dispatch) => {
    dispatch(actionsUser.setSearchTypeUser(type))
}

export const setViewItem = (view: 'module' | 'list'): ThunkCreatorType => (dispatch) => {
    dispatch(actionsUser.setViewItem(view))
}
