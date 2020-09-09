// Root
import React, {FC, memo} from "react"
import {compose} from "redux"
// HOC
import {withSuspense} from "../../HOC/withSuspense"



type PropsType = {}

export const LoginWrapper: FC<PropsType> = memo(() => {
    return <div>LoginContainer</div>
})

const LoginContainer = compose(
    withSuspense
)(LoginWrapper)

export default LoginContainer;
