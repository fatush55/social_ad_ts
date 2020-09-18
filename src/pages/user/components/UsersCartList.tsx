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
// Type
import {UsersType} from "../../../types/types"
// Thunk
import {setFollow} from "../../../thunks/user-thunk"
// Selector
import {getFollowProgress, getIsLoadingUsers, getUser} from "../../../selectors/users-selector"
import {getDefaultAvatarUsers} from "../../../selectors/app-selector"
import {getIsAuth} from "../../../selectors/auth-selector";


type PropsType = {}

type MockPropsType = {
    id: number
    name?: string
    followed?: boolean
    photos?: null
    status?: string
}

type StyleType = {
    img: string
}

const useStyles = makeStyles<Theme, StyleType>((theme) => createStyles({
    root: {
      height: 100,
        backgroundColor: theme.palette.primary.main,
    },
    img: props => ({
        width: '100%',
        height: '100%',
        backgroundImage: `url(${props.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
    }),
    item: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wave: {
        '&:after': {
            background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,

        }
    },
    waveImg: {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
    },
    loadBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

export const UsersCartList: FC<PropsType & UsersType | MockPropsType> = memo(({id, name, followed, photos, status}) => {
    const defaultAvatarUsers = useSelector(getDefaultAvatarUsers)
    const dispatch = useDispatch()
    const followProgress = useSelector(getFollowProgress)
    const users = useSelector(getUser)
    const isLoadingUsers = useSelector(getIsLoadingUsers)
    const isAuth = useSelector(getIsAuth)

    const isDisabled = followProgress.some(elem => elem === id)

    const img = photos && photos.large
        ? photos.large
        : defaultAvatarUsers

    // const colorIcon = isDisabled
    //     ? 'inherit'
    //     : followed ? 'error' : 'secondary'

    const classes = useStyles({img})
    const classesImgSkeleton = clsx({[classes.wave]: true, [classes.waveImg]: isLoadingUsers})

    const handlerFallow = () => dispatch((setFollow(id, users)))

    return (
        <Grid item lg={8}  xs={12}>
            <Paper elevation={2}>
                <Grid container className={classes.root} >
                    <Grid item xs={4}>
                        {
                            isLoadingUsers
                                ? <>
                                    <Skeleton animation={'wave'} variant={'rect'} height={'100%'} width={'100%'} className={classesImgSkeleton} />
                                </>
                                : <>
                                    <Paper className={classes.img} elevation={0} />
                                </>
                        }
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        {
                            isLoadingUsers
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
                        <>
                            {
                                isAuth && (
                                    <>
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
                                                        startIcon={isDisabled ? <FavoriteBorder color={'error'} /> : <FavoriteTwoTone color={'error'} />}
                                                        onClick={handlerFallow}
                                                    >
                                                        <Typography color={"textPrimary"}>
                                                            {followed ? 'unfollow' : 'fallow'}
                                                        </Typography>
                                                        {isDisabled && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                    </Button>
                                                </>
                                        }
                                    </>
                                )
                            }
                        </>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
})
