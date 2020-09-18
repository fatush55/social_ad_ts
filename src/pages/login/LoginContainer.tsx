// Root
import React, {FC, memo} from "react"
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles"
import {Redirect} from "react-router"
import ParticlesBg from "particles-bg"
// Materialize Components
import {Grid, Paper, fade} from "@material-ui/core"
// Materialize Icon
import {} from "@material-ui/icons"
import {compose} from "redux";
import {withSuspense} from "../../HOC/withSuspense";
import {LoginForm} from "./components/LoginForm";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../selectors/auth-selector";


type PropsType = {}

type StyleType = {}

const useStyles = makeStyles<Theme & StyleType>((theme) => createStyles({
    root: {
        height: 'calc(100vh - 115px)',
    },
    heightFull: {
        height: '100%',
    },
    wrapperForm: {
        zIndex: 10,
        padding: theme.spacing(10),
        backgroundColor: fade( theme.palette.primary.main, .8),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
    },
    animateBg:   {
    }
}))

export const LoginWrapper: FC<PropsType> = memo(() => {
    const classes = useStyles()
    const isAuth  = useSelector(getIsAuth)

    if (isAuth) return <Redirect to={'/profile'}/>

    return (
        <div className={classes.root}>
            <Grid container className={classes.heightFull}>
                <Grid item md={12} className={classes.heightFull}>
                    <Grid container justify={'center'} alignItems={'center'} className={classes.heightFull}>
                        <div>
                            <Paper className={classes.wrapperForm}>
                                <LoginForm />
                            </Paper>
                        </div>
                    </Grid>
                    <ParticlesBg type="cobweb" bg={true} />
                </Grid>
            </Grid>
        </div>
    )
})

const LoginContainer = compose(
    withSuspense
)(LoginWrapper)

export default LoginContainer;
