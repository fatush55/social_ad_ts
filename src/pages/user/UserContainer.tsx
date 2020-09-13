// Root
import React, {FC, memo, useEffect} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {parse} from "query-string"
// Mat Components
import {Grid} from '@material-ui/core'
// Mat Icon
import {UsersCartModule} from "../../components/users/UsersCartModule";
import {useDispatch, useSelector} from "react-redux";
import {getIsViewItem, getSearchUsers, getTotalUsers, getUser} from "../../selectors/users-selector";
import {requestUsers, setCurrencyPage, setViewItem} from "../../thunks/user-thunk";
import {Paginator} from "../../components/paginator/Paginator";
import {useHistory} from "react-router";
import {rangeWithObject} from "../../utils/utils";
import {UsersSearchForm} from "../../components/users/UsersSearchForm";
import {UsersCartList} from "../../components/users/UsersCartList";
import {UsersToggleViewItem} from "../../components/users/UsersToggleViewItem"
import {UsersSizePageMenu} from "../../components/users/UsersSizePageMenu"


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

    const usersPrepare = users?.length
        ? users
        : rangeWithObject(1, searchUsers.sizePage)

    const classes = useStyles({users: usersPrepare.length, viewItem})
    const countPage = count ?  Math.ceil(count / searchUsers.sizePage) : 0

    useEffect(() => {
        countPage && searchUsers.currentPage > countPage && dispatch(setCurrencyPage(countPage))
    },[searchUsers, countPage, dispatch])

    useEffect(() => {
        const queryArg = parse(history.location.search)

        if (queryArg.page) {
            dispatch(setCurrencyPage(+queryArg.page))
        }
    },[history, dispatch])

    useEffect(() => {
        dispatch(requestUsers(searchUsers.currentPage, searchUsers.sizePage, searchUsers.string, searchUsers.type))
    }, [dispatch, searchUsers])

    useEffect(() => {
        window.addEventListener('resize', () => {
            window.screen.width < 768 && dispatch(setViewItem('module'))
        })
    },[dispatch])

    return (
        <>
            <UsersSearchForm/>
            <UsersToggleViewItem />
            <Grid container spacing={4} className={classes.root} justify={ viewItem === 'module' ? 'flex-start' : 'center'}>
                {
                    viewItem === 'module'
                        ? usersPrepare.map(elem => <UsersCartModule key={elem.id} {...elem}/>)
                        : usersPrepare.map(elem => <UsersCartList key={elem.id} {...elem}/>)
                }
            </Grid>
            <Paginator countPage={countPage} />
            <UsersSizePageMenu />
        </>
    )
})
