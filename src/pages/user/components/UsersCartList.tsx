// Root
import React, {FC, memo} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import clsx from "clsx"
import {useDispatch, useSelector} from "react-redux"
// Materialize Components
import {Button, CircularProgress, Grid, Paper, Typography} from '@material-ui/core'
import {Skeleton} from "@material-ui/lab"
// Materialize Icon
import {FavoriteTwoTone, FavoriteBorder} from '@material-ui/icons'
// Style
import { useStyles } from "./UsersCartList-style"
// Type
import {UsersType} from "../../../types/types"
// Action
import {actionsUser} from '../../../actions/user-action'
// Selector
import {getFollowProgress, getIsLoadingUsers} from "../../../selectors/users-selector"
import {getDefaultAvatarUsers} from "../../../selectors/app-selector"
import {getIsAuth} from "../../../selectors/auth-selector"


type PropsType = {
    children?: never
}

type MockPropsType = {
    id: number
    name?: string
    followed?: boolean
    photos?: null
    status?: string
}

export const UsersCartList: FC<PropsType & UsersType | MockPropsType> = memo(({id, name, followed, photos, status}) => {
    const defaultAvatarUsers = useSelector(getDefaultAvatarUsers)
    const dispatch = useDispatch()
    const followProgress = useSelector(getFollowProgress)
    const isLoadingUsers = useSelector(getIsLoadingUsers)
    const isAuth = useSelector(getIsAuth)

    const isDisabled = followProgress.some((elem: number) => elem === id)

    const img = photos && photos.large ? photos.large : defaultAvatarUsers

    const classes = useStyles({img})
    const classesImgSkeleton = clsx({[classes.wave]: true, [classes.waveImg]: isLoadingUsers})

    const handlerFallow = () => dispatch(actionsUser.watchSetFollow(id))

    return (
        <Grid item lg={8}  xs={12}>
            <Paper elevation={2}>
                <Grid container className={classes.root} >
                    <Grid item xs={4}>
                        {isLoadingUsers
                            ? <>
                                <Skeleton animation={'wave'} variant={'rect'} height={'100%'} width={'100%'} className={classesImgSkeleton} />
                            </>
                            : <>
                                <Paper className={classes.img} elevation={0} />
                            </>
                        }
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        {isLoadingUsers
                            ? <>
                                <Skeleton animation={'wave'} height={25} width={'70%'} className={classes.wave} />
                                <Skeleton animation={'wave'} width={'100%'} className={classes.wave} />
                            </>
                            : <>
                                <Typography gutterBottom variant="h6" component="h6">
                                    {name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {status ? status : '...'}
                                </Typography>
                            </>
                        }
                    </Grid>
                    <Grid item xs={2} className={classes.loadBtn}>
                        {isAuth && <>
                            {
                                isLoadingUsers
                                    ? <>
                                        <Skeleton animation={'wave'} height={50}  width={'50%'} className={classes.wave} />
                                    </>
                                    : <>

                                        <Button
                                            size="small"
                                            color='secondary'
                                            disabled={isDisabled}
                                            startIcon={followed ? <FavoriteTwoTone color={'error'} /> : <FavoriteBorder color={'disabled'} />}
                                            onClick={handlerFallow}
                                        >
                                            <Typography color={"textPrimary"}>
                                                {followed ? 'unfollow' : 'fallow'}
                                            </Typography>
                                            {isDisabled && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </Button>
                                    </>
                            }
                        </>}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
})
