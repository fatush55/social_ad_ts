// Root
import React, {FC} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import clsx from "clsx"
import {useLocation} from "react-router-dom"
// Mat Components
import {Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
// Mat Icon
import {ChevronLeft as ChevronLeftIcon, Inbox as InboxIcon, Mail as MailIcon,} from '@material-ui/icons'
import {NavbarDrawerLInkItem} from "./NavbarDrawerLInkItem"


type PropsType = {
    handleDrawerClose: () => void
    editModeDrawer: boolean
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

export const NavbarDrawer: FC<PropsType> = ({handleDrawerClose, editModeDrawer}) => {
    const classes = useStyles(drawerWidth)
    const location = useLocation()

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: editModeDrawer,
                [classes.drawerClose]: !editModeDrawer,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: editModeDrawer,
                    [classes.drawerClose]: !editModeDrawer,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    navLinkItems.map(elem => <NavbarDrawerLInkItem key={elem.title}  {...elem}/>)
                }
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon color={"secondary"} /> : <MailIcon color={"secondary"} />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
