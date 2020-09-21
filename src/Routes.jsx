// Root
import React, {lazy} from "react"
import {Route, Switch,} from "react-router-dom"
// HOC
import {withSuspense} from "./HOC/withSuspense"
// Pages
import {ProfileContainer} from "./pages/profile/ProfileContainer"
import {UserContainer} from "./pages/user/UserContainer"

// Laze PagesContainer
const DialogContainer = lazy(() => import("./pages/dialog/DialogContainer"))
const LoginContainer = lazy(() => import("./pages/login/LoginContainer"))

const Dialog = withSuspense(DialogContainer)
const Login = withSuspense(LoginContainer)

export const Routes = () => {
    return (
        <Switch>
            <Route path='/' render={() => <ProfileContainer />} exact />
            <Route path='/profile/:idUser?' render={() => <ProfileContainer />} />
            <Route path='/users' render={() => <UserContainer />} />
            <Route path='/dialog/:idUser?' render={() => <Dialog />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => (<div>404</div>)} />
        </Switch>
    )
}
