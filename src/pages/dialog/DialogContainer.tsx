// Root
import React, {FC, memo} from "react"
import {compose} from "redux"
// HOC
import {withSuspense} from "../../HOC/withSuspense"


type PropsType = {}

const DialogWrapper: FC<PropsType> = memo(() => {
    return <div>DialogContainer</div>
})

const DialogContainer = compose(
    withSuspense
)(DialogWrapper)

export default DialogContainer;