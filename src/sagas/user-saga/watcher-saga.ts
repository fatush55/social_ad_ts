// Core
import {SagaIterator} from "redux-saga"
import {all, call, takeEvery, takeLatest} from "redux-saga/effects"
// Action
import {USER_WATCH_SET_FOLLOW, USER_WATCH_SET_USER} from '../../actions/user-action'
// Worker
import { workerSetUsers, workerSetFollow } from "./worker-saga"


function* watchSetUsers(): SagaIterator {
    yield takeLatest(USER_WATCH_SET_USER, workerSetUsers)
}

function* watchFollow(): SagaIterator {
    yield takeEvery(USER_WATCH_SET_FOLLOW, workerSetFollow)
}

export function* userSagaWatcher(): SagaIterator {
    yield all([
        call(watchSetUsers),
        call(watchFollow),
    ])
}