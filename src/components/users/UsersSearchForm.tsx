// Root
import React, {FC, memo} from "react"
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import {InputBase} from 'formik-material-ui'
// Mat Components
import {CircularProgress, Paper} from '@material-ui/core'
// Mat Icon
import {Search as SearchIcon} from '@material-ui/icons'
import {useDispatch, useSelector} from "react-redux";
import {getDrawerMode} from "../../selectors/app-selector";
import {AutoSubmit} from "../formik/AutoSubmit"
import {setSearchUser} from "../../thunks/user-thunk";
import {getIsLoadingUsers, getSearchUsers} from "../../selectors/users-selector";
import {UsersSearchTypeMenu} from "./UsersSearchTypeMenu"


type PropsType = {}

type StyleType = {
    drawerMode: boolean
}

type ValuesType = {
    search: string
}

const useStyles = makeStyles<Theme, StyleType>((theme) => createStyles({
    wrapper: {
        position: 'fixed',
        zIndex: 99,
        width: props => !props.drawerMode ? 'calc(100% - 105px)' : 'calc(100% - 268px)',
        [theme.breakpoints.up('md')]: {
            width: props => !props.drawerMode ? 'calc(70% - 105px)' : 'calc(70% - 268px)',
            marginLeft: '15%',
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
        height: 50,
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
        width: '100%',
        height: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(6)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: 16,
    },
    searchProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
    },
}))

export const UsersSearchForm: FC<PropsType> = memo(() => {
    const dispatch = useDispatch()
    const drawerMode = useSelector(getDrawerMode)
    const searchUsers = useSelector(getSearchUsers)
    const isLoadingUsers = useSelector(getIsLoadingUsers)

    const classes = useStyles({drawerMode})

    const initializeValue = {
        search: searchUsers.string,
    }

    const handlerSubmit = (value: ValuesType, action: FormikHelpers<ValuesType>) => {
        dispatch(setSearchUser(value.search))
        action.setSubmitting(false)
    }

    return (
        <Formik initialValues={initializeValue} onSubmit={handlerSubmit}>
            {(action ) => (
                <Form>
                    <Paper className={classes.wrapper}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                {
                                    isLoadingUsers
                                        ? <CircularProgress size={24} className={classes.searchProgress} />
                                        : <SearchIcon color={'secondary'} fontSize={'large'} />
                                }

                            </div>

                            <Field
                                placeholder="Search…"
                                component={InputBase}
                                name="search"
                                type="text"
                                classes={{
                                   root: classes.inputRoot,
                                   input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                disabled={isLoadingUsers}
                                autoFocus={true}
                            />

                            <UsersSearchTypeMenu />
                        </div>
                    </Paper>

                    <AutoSubmit debounceMs={500}/>
                </Form>
            )}
        </Formik>
    )
})
