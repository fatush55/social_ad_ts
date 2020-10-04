// Core
import {call, put, select} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'
// Api
import {userApi} from '../../api/user-api'
// Action
import {actionsUser} from '../../actions/user-action'
import {actionsApp} from "../../actions/app-action"
// Selector
import {getSearchUsers, getFollowProgress, getUser} from "../../selectors/users-selector"
import { getFollowingUsersProfile } from '../../selectors/app-selector'
// Type
import {SearchUsersType} from '../../types/user-type'
import {ResponseResultCodeType} from "../../api/api"
import {UsersType} from "../../types/types"


export function* workerSetUsers(): SagaIterator {
    const userSearch: SearchUsersType = yield select(getSearchUsers)

    yield put(actionsUser.triggerLoadingUsers(true))

    try {
        const user = yield call(userApi.getUsers, userSearch)

        yield put(actionsUser.setUsers(user.items))
        yield put(actionsUser.setTotalUsers(user.totalCount))
        yield put(actionsUser.triggerLoadingUsers(false))

    } catch (e) {
        yield put(actionsUser.triggerLoadingUsers(false))

        console.log(e)
    }
}

type WorkerFollowType = {
    type: string
    payload: {
        id : number
    }
}

export function* workerSetFollow({payload}: WorkerFollowType): SagaIterator {
    const users: Array<UsersType> = yield select(getUser)
    const followProgress: Array<number> = yield select(getFollowProgress)
    const id = payload.id

    const item = users.find((elem) => elem.id === id) as UsersType
    const isFollowing = item.followed ? 'unFollow' : 'follow'

    yield put(actionsUser.triggerFollowProgress([...followProgress, id]))

    try {
        const data = yield call(userApi.setFollowed, isFollowing, id)

        if (data.resultCode === ResponseResultCodeType.success) {

            const followingUserProfile: Array<UsersType> = yield select(getFollowingUsersProfile)

            yield put(actionsUser.fallowUser(id))

            const followingUser = item.followed ? followingUserProfile.filter(elem => elem.id !== item.id) : [...followingUserProfile, item]
            yield put(actionsApp.setFallowingUserProfile(followingUser))
        }

        yield put(actionsUser.triggerFollowProgress(followProgress.filter(item => item !== id)))
    } catch (e) {
        console.log(e)
        yield put(actionsUser.triggerFollowProgress(followProgress.filter(item => item !== id)))
    }
}
