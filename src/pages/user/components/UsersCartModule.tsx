// Root
import React, {FC, memo} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {useDispatch, useSelector} from "react-redux"
// Materialize Components
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography
} from '@material-ui/core'
import {Skeleton} from "@material-ui/lab"
// Materialize Icon
import {FavoriteBorder, FavoriteTwoTone} from '@material-ui/icons'
// Thunk
import {setFollow} from "../../../thunks/user-thunk"
// Selector
import {getFollowProgress, getIsLoadingUsers, getUser} from "../../../selectors/users-selector"
import {getDefaultAvatarUsers} from "../../../selectors/app-selector"
import {getIsAuth} from "../../../selectors/auth-selector"
// Type
import {UsersType} from "../../../types/types"


type PropsType  = {

}

type MockPropsType = {
    id: number
    name?: string
    followed?: boolean
    photos?: null
    status?: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        backgroundColor: theme.palette.primary.main,
    },
    media: {
        height: 100
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
           background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`
       }
    },
    name: {
        wordBreak: 'break-all',
    }
}))

export const UsersCartModule: FC<PropsType & UsersType | MockPropsType > = memo(({id, name, followed, photos, status}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const followProgress = useSelector(getFollowProgress)
    const users = useSelector(getUser)
    const isLoadingUsers = useSelector(getIsLoadingUsers)
    const defaultAvatarUsers = useSelector(getDefaultAvatarUsers)
    const isAuth = useSelector(getIsAuth)

    const isDisabled = followProgress.some(elem => elem === id)
    const img = photos && photos.large
        ? photos.large
        : defaultAvatarUsers

    const handlerFallow = () => dispatch((setFollow(id, users)))

    return (
        <Grid item xs={12} md={2}>
            <Card className={classes.card}>
                <CardActionArea>
                    {isLoadingUsers
                        ? <>
                            <Skeleton animation={'wave'} variant={'rect'} height={100}  width={'100%'} className={classes.wave} />
                        </>
                        : <>
                             <CardMedia
                                className={classes.media}
                                image={img}
                                title="Contemplative Reptile"
                            />
                        </>
                    }
                    <CardContent>
                        {isLoadingUsers
                            ? <>
                                <Skeleton animation={'wave'} height={25} width={'70%'} className={classes.wave} />
                                <Skeleton animation={'wave'} width={'100%'} className={classes.wave} />
                            </>
                            : <>
                                <Typography gutterBottom variant="h6" component="h6">
                                    {name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.name}>
                                    {status ? status : '...'}
                                </Typography>
                            </>
                        }
                    </CardContent>
                </CardActionArea>
                <>
                    {isAuth &&
                        <CardActions>
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
                        </CardActions>
                    }
                </>
            </Card>
        </Grid>
    )
})
