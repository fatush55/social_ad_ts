// Root
import React, {FC, memo, useEffect, useState} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {parse} from "query-string"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router"
// Materialize Components
import {Grid} from '@material-ui/core'
// Materialize Icon
import {UsersCartModule} from "./components/UsersCartModule"
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
import {Paginator} from "../../components/paginator/Paginator"
import {UsersSearchForm} from "./components/UsersSearchForm"
import {UsersCartList} from "./components/UsersCartList"
import {UsersToggleViewItem} from "./components/UsersToggleViewItem"
import {UsersSizePageMenu} from "./components/UsersSizePageMenu"


type PropsType = {}

type StylesProps = {
    users: number
    viewItem: 'module' | 'list'
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => createStyles({
    root: {
        marginTop: 70,
        height: props => {
            return props.viewItem === 'module'
                ? props.users > 10 ? 'auto' : '100vh'
                : props.users > 5 ? 'auto' : '100vh'
        }
    },
}))

export const UserContainer: FC<PropsType> = memo(() => {
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

    const classes = useStyles({users: users.length, viewItem})
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

    return (
        <>
            {!isInitialize && <>
                <UsersSearchForm search={searchUsers.search}/>
                <UsersToggleViewItem />
                <Grid container spacing={4} className={classes.root} justify={ viewItem === 'module' ? 'flex-start' : 'center'}>
                    {
                        viewItem === 'module'
                            ? users.map(elem => <UsersCartModule key={elem.id} {...elem}/>)
                            : users.map(elem => <UsersCartList key={elem.id} {...elem}/>)
                    }
                </Grid>
                <Paginator countPage={countPage} />
                <UsersSizePageMenu />
            </>}
        </>
    )
})
