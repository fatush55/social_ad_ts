// Root
import React, {FC, memo, MouseEvent, useState} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {useDispatch, useSelector} from "react-redux"
// Materialize Components
import {IconButton, Menu, MenuItem} from '@material-ui/core'
// Materialize Icon
import {FilterListTwoTone} from '@material-ui/icons'
// Thunk
import {setSearchTypeUser} from "../../../thunks/user-thunk"
// Selector
import {getIsLoadingUsers, getSearchUsers} from "../../../selectors/users-selector"
import {getIsAuth} from "../../../selectors/auth-selector"


type PropsType = {}

type StyleType = {}

const useStyles = makeStyles<Theme & StyleType>((theme) => createStyles({
    filterIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        left: 'calc(100% - 80px)',
        top: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
    },
}))

export const UsersSearchTypeMenu: FC<PropsType> = memo(() => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const searchUsers = useSelector(getSearchUsers)
    const isLoadingUsers = useSelector(getIsLoadingUsers)
    const isAuth = useSelector(getIsAuth)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const handlerSearchType = (type: 'all' | 'follow' | 'other') => {
        setAnchorEl(null)
        dispatch(setSearchTypeUser(type))
    }

    return (
        <>
            {isAuth && <>
                <div className={classes.filterIcon}>
                    <IconButton onClick={handleClick} disabled={isLoadingUsers}>
                        <FilterListTwoTone color={'secondary'} fontSize={'large'} />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        disableAutoFocusItem={true}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem selected={searchUsers.type === 'all'} onClick={() => handlerSearchType('all')}>All</MenuItem>
                        <MenuItem selected={searchUsers.type === 'follow'} onClick={() => handlerSearchType('follow')}>Fallowing</MenuItem>
                        <MenuItem selected={searchUsers.type === 'other'} onClick={() => handlerSearchType('other')}>Other</MenuItem>
                    </Menu>
                </div>
            </>}
        </>
    )
})
