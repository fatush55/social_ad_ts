// Root
import React, {FC, memo, useEffect} from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
// Mat Components
import {Grid, Paper, Card, CardMedia, Typography, CardContent, CardActionArea, CardActions, IconButton, Button} from '@material-ui/core'
// Mat Icon
import {FavoriteTwoTone} from '@material-ui/icons'
import {UserCart} from "../../components/user-cart/UserCart";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../selectors/dialog-selector";
import { getUser } from "../../selectors/users-selector";
import { requestUsers } from "../../thunks/user-thunk";


type PropsType = {}

const useStyles = makeStyles((theme: Theme) => createStyles({

}))

export const UserContainer: FC<PropsType> = memo(() => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const users = useSelector(getUser)


    useEffect(() => {
        dispatch(requestUsers(1, 20))
    }, [])

    console.log(users)

    return (
        <Grid container spacing={4} >
            {
                users.map(elem => <UserCart key={elem.id} {...elem}/>)
            }
        </Grid>
    )
})
