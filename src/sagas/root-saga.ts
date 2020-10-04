// Root
import {all} from 'redux-saga/effects'
// Watcher
import {userSagaWatcher} from './user-saga/watcher-saga'


export function* rootSaga(): Generator {
    yield all([
        userSagaWatcher(),
    ])
}
