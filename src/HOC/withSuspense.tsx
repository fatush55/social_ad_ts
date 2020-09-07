// Root
import React, {ComponentType, Suspense} from "react"
// Components

export const withSuspense = <T extends {}>(Component: ComponentType<T>) => {
    return (props: T) => {
        return (
            <Suspense fallback={<div>loading...</div>}>
                <Component {...props} />
            </Suspense>
        )
    }
}
