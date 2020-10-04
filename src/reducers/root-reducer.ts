// Core
import {combineReducers} from "redux"
// Reducers
import {profileReducer} from "./profile-reducer"
import {dialogReducer} from "./dialog-reducer"
import {userReducer} from "./user-reducer"
import {authReducer} from "./auth-reducer"
import {appReducer} from "./app-reducer"


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    userPage: userReducer,
    auth: authReducer,
    app: appReducer,
})
