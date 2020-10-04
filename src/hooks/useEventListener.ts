// Core
import {useEffect, useRef, MouseEvent, KeyboardEvent} from "react"


export const useEventListener = (eventName: any, handler: (event: MouseEvent | KeyboardEvent) => void, element = window) => {
    const savedHandler = useRef<any>()

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        const isSupported = element && element.addEventListener

        if (!isSupported) return

        const eventListener = (event: MouseEvent | KeyboardEvent) => savedHandler.current && savedHandler.current(event)

        element.addEventListener(eventName, eventListener)

        return () => element.removeEventListener(eventName, eventListener)
    },[eventName, element])
}
