import {useEffect, useState} from "react";



export const useMobile = (initializeValue: any, callBack: (state: any) => void): any => {
    const [state, setState] = useState(initializeValue);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(window.screen.width < 768) {
                callBack(state)
            }
        })
    },[state])

    return [state, setState]
}