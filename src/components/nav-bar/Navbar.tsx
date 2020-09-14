// Root
import React, {FC} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles'
import clsx from 'clsx'
// Materialize components
import {AppBar, Badge, IconButton, Toolbar, Typography} from '@material-ui/core'
// Materialize icon
import {
    AccountCircleTwoTone,
    Brightness7TwoTone,
    EmailTwoTone,
    Menu as MenuIcon,
    MoreTwoTone,
    NightsStayTwoTone,
} from '@material-ui/icons'
// Thunk
import {setDrawerMode, setTheme} from "../../thunks/app-thunk"
// Selector
import {getTheme, getDrawerMode} from "../../selectors/app-selector"
// Components
import {NavbarMobileMenu} from "./NavbarMobileMenu"
import {NavbarMenu} from "./NavbarMenu"


type PropsType = {
}

const drawerWidth = 220

const useStyles = makeStyles((theme: Theme) => createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
}))

export const Navbar: FC<PropsType> = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useSelector(getTheme)
    const drawerMode = useSelector(getDrawerMode)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
    const mobileMenuId = 'primary-search-account-menu-mobile'
    const menuId = 'primary-search-account-menu'

    const handlerTheme = () => dispatch(setTheme(!theme))
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(event.currentTarget)
    const handleDrawer = () => dispatch(setDrawerMode(true))

    return (
        <div className={classes.grow}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerMode,
                })}
            >
                <Toolbar>
                    {
                        !drawerMode &&
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color='secondary'
                                aria-label="open drawer"
                                onClick={handleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                    }
                    <Typography className={classes.title} variant="h4" noWrap>
                        Social GG
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        onClick={handlerTheme}
                        color={'secondary'}
                    >
                        {
                            theme ? <Brightness7TwoTone /> :  <NightsStayTwoTone />
                        }
                    </IconButton>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-label="show 4 new mails"
                            color='secondary'
                        >
                            <Badge badgeContent={4} color='error'>
                                <EmailTwoTone />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color={'secondary'}
                        >
                            <AccountCircleTwoTone />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color={'secondary'}
                        >
                            <MoreTwoTone />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <NavbarMobileMenu
                mobileMoreAnchorEl={mobileMoreAnchorEl}
                handleMobileMenuClose={handleMobileMenuClose}
                handleProfileMenuOpen={handleProfileMenuOpen}
                mobileMenuId={mobileMenuId}
            />
            <NavbarMenu
                handleMobileMenuClose={handleMobileMenuClose}
                anchorEl={anchorEl}
                menuId={menuId}
                setAnchorEl={setAnchorEl}
            />
        </div>
    )
}
