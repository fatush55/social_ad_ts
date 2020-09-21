// Action
import {actionsApp} from "../actions/app-action"
// Api
import {userApi} from "../api/user-api"
// Thunk
import {getAuth} from "../thunks/auth-thunk"
// Type
import {RootThunkCreatorType} from "../store"
import {AlertType, HiddenAlertType} from "../types/app-reducet-type"
import {ActionReducerType} from "../reducers/app-reducer"
import {UsersType} from "../types/types"


type ThunkCreatorType = RootThunkCreatorType<ActionReducerType>

export const setInitialize = (): ThunkCreatorType => async (dispatch) => {
    const promiseGetAuth = await dispatch(getAuth())
    const promiseGetFollowing = await dispatch(setFollowingUserProfile())

    const isProcessFinish = await Promise.all([promiseGetAuth, promiseGetFollowing]).then(() => true)
    isProcessFinish && dispatch(actionsApp.triggerInitialize())
}

export const setFollowingUserProfile = (): ThunkCreatorType => async (dispatch) => {
    const data = await userApi.getUsers(1, 20, '', 'follow')

    dispatch(actionsApp.setFallowingUserProfile(data.items))
}

export const updateFollowingUserProfile = (userItem: UsersType, action: 'add' | 'remove' = 'add'): ThunkCreatorType => (dispatch, getState) => {
   const followingUserProfile = getState().app.fallowingUserProfile

    switch (action) {
       case "add":
           return dispatch(actionsApp.setFallowingUserProfile([...followingUserProfile, userItem]))
       case "remove":
           return dispatch(actionsApp.setFallowingUserProfile(followingUserProfile.filter(elem => elem.id !== userItem.id)))
    }
}

export const cycleAlert = (message: AlertType): ThunkCreatorType => (dispatch) => {
    dispatch(actionsApp.setAlert(message))
    dispatch(actionsApp.setHiddenAlert('show'))
    setTimeout(() =>  dispatch(actionsApp.setHiddenAlert('hide')), 3000)
    setTimeout(() =>  dispatch(actionsApp.setAlert(null)), 4000)
}

export const setCurrentProfile = (id: number): ThunkCreatorType => (dispatch) => {
    dispatch(actionsApp.setCurrentProfile(id))
}

export const setHiddenAlert = (action: HiddenAlertType): ThunkCreatorType =>(dispatch) => {
    dispatch(actionsApp.setHiddenAlert(action))
}

export const setTheme = (theme: boolean): ThunkCreatorType => (dispatch) => {
    dispatch(actionsApp.setTheme(theme))
}

export const setDrawerMode = (mode: boolean): ThunkCreatorType => (dispatch) => {
    dispatch(actionsApp.setDrawerMode(mode))
}
