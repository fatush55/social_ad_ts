// Root
import React, {ChangeEvent, FC, memo} from "react"
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles'
// Mat Components
import {Grid, Paper} from '@material-ui/core'
import {Pagination} from '@material-ui/lab';
// Mat Icon
import {useDispatch, useSelector} from "react-redux";
import {getSearchUsers} from "../../selectors/users-selector";
import {setCurrencyPage} from "../../thunks/user-thunk";


type PropsType = {
    countPage: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),

        },
    },
    wrapper: {
        position: 'fixed',
        top: 'calc(100vh - 61px)',
    },
    fadeWrapper: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    pagination: {
        padding: 3,
    }
}))

export const Paginator: FC<PropsType> = memo(({countPage}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const searchUsers = useSelector(getSearchUsers)

    const handlerClick = (event: ChangeEvent<unknown>, value: number) => dispatch(setCurrencyPage(value))

    return (
        <div className={classes.root}>
           <Grid container justify={"center"}>
               {
                   countPage ? (
                       <Paper className={classes.wrapper} elevation={3}>
                           <Paper className={classes.fadeWrapper}>
                               <Pagination
                                   className={classes.pagination}
                                   count={countPage}
                                   shape="rounded"
                                   onChange={handlerClick}
                                   color={'secondary'}
                                   page={searchUsers.currentPage}
                               />
                           </Paper>
                       </Paper>
                   ) : ''
               }
           </Grid>
        </div>
    )
})
