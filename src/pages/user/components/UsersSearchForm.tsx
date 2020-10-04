// Root
import React, {FC, memo, useEffect, useRef} from "react"
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import {InputBase} from 'formik-material-ui'
import {useDispatch, useSelector} from "react-redux"
import * as Yup from 'yup'
// Materialize Components
import {CircularProgress, Paper} from '@material-ui/core'
// Materialize Icon
import {Search as SearchIcon} from '@material-ui/icons'
// Style
import { useStyles } from "./UsersSearchForm-style"
// Thunk
import {setSearchUser} from "../../../thunks/user-thunk"
// Selector
import {getDrawerMode} from "../../../selectors/app-selector"
import {getIsLoadingUsers} from "../../../selectors/users-selector"
// Component
import {AutoSubmit} from "../../../components/formik/AutoSubmit"
import {UsersSearchTypeMenu} from "./UsersSearchTypeMenu"


type PropsType = {
    search: string
}

type ValuesType = {
    search: string
}

const SignupSchema = Yup.object().shape({
    search: Yup.string()
    // .required('Required'),
})

export const UsersSearchForm: FC<PropsType> = memo(({search}) => {
    const dispatch = useDispatch()
    const drawerMode = useSelector(getDrawerMode)
    const isLoadingUsers = useSelector(getIsLoadingUsers)
    const classes = useStyles({drawerMode})

    const refSearch = useRef<HTMLInputElement>(null)

    const initializeValue = {
        search: search ? search : '',
    }

    const handlerSubmit = (value: ValuesType, action: FormikHelpers<ValuesType>) => {
        dispatch(setSearchUser(value.search))
        action.setSubmitting(false)
    }

    useEffect(() => {
        refSearch && refSearch.current && !isLoadingUsers && refSearch.current.focus()
    }, [refSearch, isLoadingUsers])

    return (
        <Formik initialValues={initializeValue} onSubmit={handlerSubmit} validationSchema={SignupSchema}>
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
                                inputRef={refSearch}
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
