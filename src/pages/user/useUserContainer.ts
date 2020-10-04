// Core
import {useEffect, useState} from "react"
import {parse} from "query-string"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router"
// Materialize Components
// Materialize Icon
// Hook
import {useUrl} from "../../hooks/useUrl"
// Selector
import {getIsViewItem, getSearchUsers, getTotalUsers, getUser} from "../../selectors/users-selector"
// Thunk
import {
    setCurrencyPageUser,
    setSearchTypeUser,
    setSearchUser,
    setSizePageUser,
    setViewItem
} from "../../thunks/user-thunk"
// Action Saga
import {actionsUser} from '../../actions/user-action'
// Components


export const useUserContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const count = useSelector(getTotalUsers)
    const users = useSelector(getUser)
    const viewItem = useSelector(getIsViewItem)
    const searchUsers = useSelector(getSearchUsers)

    const [, handlerUrl] = useUrl([
        {title: 'page', value: searchUsers.currentPage !== 1 && searchUsers.currentPage},
        {title: 'size', value: searchUsers.sizePage !== 20 && searchUsers.sizePage},
        {title: 'search', value: searchUsers.search },
        {title: 'type', value: searchUsers.type !== 'all' && searchUsers.type},
    ])

    const [isInitialize, setIsInitialize] = useState(true)

    const countPage = count ?  Math.ceil(count / searchUsers.sizePage) : 0

    useEffect(() => {
        countPage && searchUsers.currentPage > countPage && dispatch(setCurrencyPageUser(countPage))
    },[searchUsers, countPage, dispatch])


    useEffect(() => {
        if (isInitialize) {
            const queryArg = parse(history.location.search)

            queryArg.page && dispatch(setCurrencyPageUser(+queryArg.page))
            queryArg.size && dispatch(setSizePageUser(+queryArg.size))
            queryArg.search && dispatch(setSearchUser(queryArg.search as string))
            queryArg.type && dispatch(setSearchTypeUser(queryArg.type as 'all' | 'follow' | 'other'))
            setIsInitialize(false)
        } else {
            handlerUrl()
            dispatch(actionsUser.watchSetUser())
        }

    }, [dispatch, searchUsers, handlerUrl, isInitialize, history])

    useEffect(() => {
        window.addEventListener('resize', () => {
            window.screen.width < 768 && dispatch(setViewItem('module'))
        })
    },[dispatch])

    return {
        users,
        viewItem,
        isInitialize,
        searchUsers,
        countPage,
    }
}
