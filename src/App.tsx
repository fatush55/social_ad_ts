// Root
import React, {FC, useCallback, useEffect, useLayoutEffect} from "react"
import {Provider, useDispatch, useSelector} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"
import {store} from "./store"
import {Routes} from "./Routes"
// Theme
import {themeDark, themeLight} from "./utils/themes"
// Mat Component
import {makeStyles, Paper, Theme, ThemeProvider} from "@material-ui/core"
// Thunk
import {cycleAlert, setInitialize} from "./thunks/app-thunk"
// Selector
import {getInitialize, getTheme} from "./selectors/app-selector"
import {getIsLoadingUsers} from "./selectors/users-selector"
// Components
import {Navbar} from "./components/nav-bar/Navbar"
import {NavbarDrawer} from "./components/nav-bar/navbar-drawer/NavbarDrawer"
import {InitializeLoader} from "./components/Initialize-Loader/InitializeLoader"
import {ItemLoader} from "./components/item-loder/ItemLoader"


const useStyles = makeStyles( (theme: Theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: '100vw',
        marginTop: 65,
        zIndex: 0,
    },
}));


const AppContainer: FC = (props,) => {
    const dark = themeDark()
    const light = themeLight()
    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useSelector(getTheme)
    const initialize = useSelector(getInitialize)
    const isLoadingUsers  = useSelector(getIsLoadingUsers)

    const catchAllUnHandlerErrors = useCallback ( () => (promiseRejectedEvent: {reason: any}): void => {
        dispatch(cycleAlert({message: promiseRejectedEvent.reason.message, type: "error"}))
    }, [dispatch])

    useLayoutEffect(() => {
        window.removeEventListener('unhandledrejection', catchAllUnHandlerErrors)
    })

    useEffect(() => {
        dispatch(setInitialize())
        window.addEventListener('unhandledrejection', catchAllUnHandlerErrors)
    }, [catchAllUnHandlerErrors, dispatch])

    return (
        <ThemeProvider theme={theme ? dark : light}>
        {initialize
            ? <>
                <Paper square>
                   <Router>
                       {
                           isLoadingUsers &&  <ItemLoader/>
                       }
                       <div className={classes.root}>
                           <Navbar />
                           <NavbarDrawer />
                           <main className={classes.content}>
                               <Routes/>
                           </main>
                       </div>
                   </Router>
                </Paper>
            </>
            : <InitializeLoader />
        }
        </ThemeProvider>
    )
}

export const App: FC = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </React.StrictMode>
    )
}
