// Root
import React, {FC, memo} from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
// Mat Components
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, CircularProgress} from '@material-ui/core'
// Mat Icon
import {FavoriteTwoTone} from '@material-ui/icons'
import { UsersType } from "../../types/types"
import {useDispatch, useSelector} from "react-redux";
import {getFollowProgress, getIsLoadingUsers, getUser} from "../../selectors/users-selector"
import { setFollow } from "../../thunks/user-thunk"
import { getDefaultAvatarUsers } from "../../selectors/app-selector"
import {Skeleton} from "@material-ui/lab"


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
    }
}))

export const UsersCartModule: FC<PropsType & UsersType | MockPropsType > = memo(({id, name, followed, photos, status}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const followProgress = useSelector(getFollowProgress)
    const users = useSelector(getUser)
    const isLoadingUsers = useSelector(getIsLoadingUsers)
    const defaultAvatarUsers = useSelector(getDefaultAvatarUsers)

    const isDisabled = followProgress.some(elem => elem === id)
    const img = photos && photos.large
        ? photos.large
        : defaultAvatarUsers

    const colorIcon = isDisabled
        ? 'inherit'
        : followed ? 'error' : 'secondary'

    const handlerFallow = () => dispatch((setFollow(id, users)))

    return (
        <Grid item xs={12} md={2}>
            <Card>
                <CardActionArea>
                    {
                        isLoadingUsers
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
                    </CardContent>
                </CardActionArea>
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
                                    startIcon={<FavoriteTwoTone color={colorIcon} />}
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
            </Card>
        </Grid>
    )
})