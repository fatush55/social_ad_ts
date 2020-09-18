// Root
import React, {FC, memo, useState} from "react"
import {createStyles, makeStyles, Theme,} from "@material-ui/core/styles"
import {Field, Form, Formik, FormikHelpers} from "formik"
import {CheckboxWithLabel, TextField,} from "formik-material-ui"
// Materialize Components
import {Button, FormControl, Grid, IconButton, InputAdornment, Avatar, Typography, Paper} from "@material-ui/core"
// Materialize Icon
import {Visibility, VisibilityOff, Lock} from "@material-ui/icons"
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../../../thunks/auth-thunk"
import {getCaptcha} from "../../../selectors/auth-selector";


type PropsType = {}

type StyleType = {
    captcha: string
}

type InitializeValueType = {
    email: string
    password: string
    rememberMy: boolean
    captcha: string
}

const useStyles = makeStyles<Theme, StyleType>((theme) => createStyles({
    root: {
        '& input': {
            paddingRight: 50,
        },
    },
    passwordWrapper: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        left: 'calc(100% - 60px)',
        top: 35,
        '& svg': {
            color: theme.palette.secondary.main
        },
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        marginBottom: theme.spacing(3),
    },
    captchaImg: {
        height: theme.spacing(7),
        backgroundImage: props => `url(${props.captcha})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }
}))

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .required('Required')
        .email('not valid email')
        .min(7, 'min 7 symbol'),
    password: Yup.string()
        .required('Required')
        .min(5, 'min 5 symbol')
        .max(25, 'max 25 symbol')
})

export const LoginForm: FC<PropsType> = memo(() => {
    const dispatch = useDispatch()
    const captcha  = useSelector(getCaptcha)
    const classes = useStyles({captcha})

    const [modePassword, setModePassword] = useState(false);

    const initializeValue = {
        email: '',
        password: '',
        rememberMy: true,
        captcha: '',
    }

    console.log(captcha)

    const handlerSubmit = (value: InitializeValueType, action: FormikHelpers<InitializeValueType>) => {
        const response =  dispatch(login(value))
        // @ts-ignore
        response.then(data => data && action.setErrors({email: 'no valid Email', password: 'no valid Password'}))
        action.setSubmitting(false)
    }

    const handleClickShowPassword = () => setModePassword(!modePassword)


    return (
        <Formik initialValues={initializeValue} onSubmit={handlerSubmit} validationSchema={SignupSchema}>
            {(action) => (
                <Form>
                    <Grid container direction={'column'} spacing={2}>
                        <Grid item xs={12} container alignItems={'center'} direction={'column'} >
                            <Avatar className={classes.avatar}>
                                <Lock/>
                            </Avatar>
                            <Typography variant={'h4'} color={'secondary'}>
                                LOG IN
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="filled">
                                <Field
                                    component={TextField}
                                    name="email"
                                    type={'email'}
                                    color={'secondary'}
                                    label="Email"
                                    variant='filled'
                                    className={classes.root}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="filled" className={classes.passwordWrapper}>
                                <Grid container alignItems={'center'}>
                                    <Field
                                        component={TextField}
                                        name="password"
                                        type={modePassword ? 'text' : 'password'}
                                        color={'secondary'}
                                        label="Password"
                                        variant='filled'
                                        className={classes.root}
                                    />
                                    <InputAdornment position="end" className={classes.icon}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {modePassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                </Grid>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="rememberMy"
                                Label={{ label: 'Remember My' }}
                            />
                        </Grid>
                        {<>{captcha && <>

                            <Grid container item xs={12} spacing={1}>
                                <Grid item xs={6}>
                                    <FormControl variant="filled">
                                        <Field
                                            component={TextField}
                                            name="captcha"
                                            type={'text'}
                                            color={'secondary'}
                                            label="Captcha"
                                            variant='filled'
                                            className={classes.root}
                                            style={{widths: '50%'}}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.captchaImg}/>
                                </Grid>
                            </Grid>
                        </>}</>}
                        <Grid item xs={12}>
                            <Button type={'submit'} variant="outlined" color="secondary">
                                Log In
                            </Button>
                        </Grid>

                    </Grid>



                </Form>
            )}
        </Formik>
    )
})
