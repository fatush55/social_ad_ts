// Root
import React, {FC} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import clsx from "clsx"
import {useDispatch, useSelector} from "react-redux"
// Materialize Components
import {Divider, Drawer, IconButton, List} from '@material-ui/core'
// Materialize Icon
import {ChevronLeft as ChevronLeftIcon,} from '@material-ui/icons'
// Thunk
import {setDrawerMode} from "../../../thunks/app-thunk"
// Selector
import {getDrawerMode} from "../../../selectors/app-selector"
// Component
import {NavbarDrawerLinkItem} from "./NavbarDrawerLinkItem"
import {NavbarDrawerUserItem} from "./NavbarDrawerUserItem"


type PropsType = {
}

const drawerWidth = 220

const useStyles = makeStyles((theme: Theme) => createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}))

const navLinkItems = [
    {to: '/profile', title: 'Profile'},
    {to: '/dialog', title: 'Dialog'},
    {to: '/users', title: 'Users'},
]

export const NavbarDrawer: FC<PropsType> = (props) => {
    const classes = useStyles(drawerWidth)
    const dispatch = useDispatch()
    const drawerMode = useSelector(getDrawerMode)

    const handleDrawer = () => dispatch(setDrawerMode(false))

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: drawerMode,
                [classes.drawerClose]: !drawerMode,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: drawerMode,
                    [classes.drawerClose]: !drawerMode,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    navLinkItems.map(elem => <NavbarDrawerLinkItem key={elem.title}  {...elem}/>)
                }
            </List>
            <Divider />
            <List>
                <NavbarDrawerUserItem />
            </List>
        </Drawer>
    )
}
