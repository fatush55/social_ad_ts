// Root
import React, {FC, memo} from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
// Mat Components
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, CircularProgress} from '@material-ui/core'
// Mat Icon
import {FavoriteTwoTone} from '@material-ui/icons'
import { UsersType } from "../../types/types"
import {useDispatch, useSelector} from "react-redux";
import {getFollowProgress, getUser} from "../../selectors/users-selector"
import { setFollow } from "../../thunks/user-thunk"


type PropsType  = {

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
}))

export const UserCart: FC<PropsType & UsersType> = memo(({id, name, followed, photos, status}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const followProgress = useSelector(getFollowProgress)
    const users = useSelector(getUser)

    const isDisabled = followProgress.some(elem => elem === id)
    const img = photos && photos.large
        ? photos.large
        : 'https://img.cinemablend.com/filter:scale/quill/7/b/0/f/8/a/7b0f8a4adb090171ee6a3823041db28a3e7b5d49.png?mw=600'

    const colorIcon = isDisabled
        ? 'inherit'
        : followed ? 'error' : 'secondary'

    const handlerFallow = () => dispatch((setFollow(id, users)))

    return (
        <Grid item xs={12} md={2}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={img}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h6">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {status ? status : '...'}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
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
                </CardActions>
            </Card>
        </Grid>
    )
})
