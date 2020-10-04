// Root
import {MouseEvent, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getIsViewItem} from "../../../../selectors/users-selector";
import {setViewItem} from "../../../../thunks/user-thunk";



export const useUsersToggleViewItem = () => {
    const dispatch = useDispatch()
    const viewItem = useSelector(getIsViewItem)

    const handleChange = (event: MouseEvent<HTMLElement>, nextView: 'module' | 'list') => dispatch(setViewItem(nextView))

    return {
        action: {
            handleChange
        },
        viewItem
    }
}
