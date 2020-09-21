// Root
import React, {FC} from "react"
import { NavLink } from "react-router-dom"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from "react-redux"
// Materialize Components
import {Menu, MenuItem} from '@material-ui/core'
// Selector
import {getIsAuth} from "../../selectors/auth-selector"
// Thunk
import {logout} from "../../thunks/auth-thunk"


type PropsType = {
    menuId: string
    anchorEl: null | HTMLElement
    setAnchorEl: (arg: null | HTMLElement) => void
    handleMobileMenuClose: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
    },
    itemList: {
        '&:hover a': {
            color: theme.palette.secondary.main,
        }
    }
}))

export const NavbarMenu: FC<PropsType> = (props) => {
    const {menuId, anchorEl, setAnchorEl, handleMobileMenuClose} = props
    const classes = useStyles()
    const dispatch = useDispatch()
    const isMenuOpen = Boolean(anchorEl)
    const isAuth = useSelector(getIsAuth)

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handlerLogout = () => {
        handleMenuClose()
        dispatch(logout())
    }

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                isAuth
                    ? (
                        <MenuItem onClick={handlerLogout} className={classes.itemList}>
                            Logout
                        </MenuItem>
                    )
                    : (
                        <MenuItem onClick={handleMenuClose} className={classes.itemList}>
                            <NavLink to="/login" className={classes.link}>
                                Login
                            </NavLink>
                        </MenuItem>
                    )
            }
        </Menu>
    )
}
