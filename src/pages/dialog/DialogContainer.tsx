// Root
import React, {FC, memo} from "react"
import {compose} from "redux"
// HOC
import {withSuspense} from "../../HOC/withSuspense"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"


type PropsType = {}

const DialogWrapper: FC<PropsType> = memo(() => {
    return <div>DialogContainer</div>
})

const DialogContainer = compose(
    withSuspense,
    withAuthRedirect,
)(DialogWrapper)

export default DialogContainer;