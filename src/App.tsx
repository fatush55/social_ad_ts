// Root
import React, {FC, useCallback, useEffect, useLayoutEffect, useState} from "react"
import {Provider, useDispatch, useSelector} from "react-redux"
import {store} from "./store"
import {BrowserRouter as Router} from "react-router-dom"
// Theme
import {themeDark, themeLight} from "./utils/themes"
// Mat Component
import {makeStyles, Paper, Theme, ThemeProvider} from "@material-ui/core"

// Reducer
import {cycleAlert, setInitialize} from "./thunks/app-thunk"
// Selector
import {getInitialize, getTheme} from "./selectors/app-selector"
import {Navbar} from "./components/navbar/Navbar"
import {Routes} from "./Routes"
import {NavbarDrawer} from "./components/navbar-drawer/NavbarDrawer"
import {InitializeLoader} from "./components/Initialize-Loader/InitializeLoader"

// Components
// Type


const useStyles = makeStyles( (theme: Theme) => ({
    rootWrapper: {
        // height: '100%',
    },
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: '100vw',
        marginTop: 65,
    },
}));


const AppContainer: FC = (props) => {
    const dark = themeDark()
    const light = themeLight()
    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useSelector(getTheme)
    const initialize = useSelector(getInitialize)

    const [editModeDrawer, setEditModeDrawer] = useState(false);

    const catchAllUnHandlerErrors = useCallback ( () => (promiseRejectedEvent: {reason: any}): void => {
        dispatch(cycleAlert({message: promiseRejectedEvent.reason.message, type: "error"}))
    }, [dispatch])

    const handleDrawerEditMode = () => setEditModeDrawer(!editModeDrawer)


    useLayoutEffect(() => {
        window.removeEventListener('unhandledrejection', catchAllUnHandlerErrors)
    })

    useEffect(() => {
        dispatch(setInitialize())
        window.addEventListener('unhandledrejection', catchAllUnHandlerErrors)
    }, [catchAllUnHandlerErrors, dispatch])


    return (
        <ThemeProvider theme={theme ? dark : light}>
        {
            initialize
                ?
                <>
                <Paper className={classes.rootWrapper} square>
                   <Router>
                       <div className={classes.root}>
                           <Navbar
                               handleDrawerClose={handleDrawerEditMode}
                               editModeDrawer={editModeDrawer}
                           />
                           <NavbarDrawer
                               handleDrawerClose={handleDrawerEditMode}
                               editModeDrawer={editModeDrawer}
                           />
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
