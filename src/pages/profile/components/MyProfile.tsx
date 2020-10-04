// Root
import React, {FC, memo, useState} from "react"
import {createStyles, fade, makeStyles, Theme, useTheme} from "@material-ui/core/styles"
import clsx from "clsx"
import {animated, useSpring} from "react-spring"
import {useSelector} from "react-redux"
// Materialize Components
import {
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography,
    useMediaQuery
} from "@material-ui/core"
// Materialize Icon
import {
    AccountCircleTwoTone,
    EditTwoTone,
    ListAltTwoTone,
    SpeakerNotesOffTwoTone,
    SpeakerNotesTwoTone
} from "@material-ui/icons"
// Selector
import {getMyProfile} from "../../../selectors/auth-selector"
import {getDefaultAvatarUsers} from "../../../selectors/app-selector"
// Components
import {ListInfoProfile} from "./ListInfoProfile"


type PropsType = {}

type StyleType = {
    avatarUrl: string
}

const useStyles = makeStyles<Theme, StyleType>((theme) => createStyles({
    root: {
        position: 'relative',
    },
    itemWrapper: {
        padding: theme.spacing(2),
        overflow: 'hidden',
        marginTop: 5,
        height: 'calc(100vh - 222px)'
    },
    stick: {
        borderRight: `2px solid ${fade(theme.palette.secondary.main, .3)}`,
    },
    avatar: {
        width: '90%',
        height: 200,
        marginLeft: '5%',
        marginTop: 30,
        backgroundImage: props => `url(${props.avatarUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
    columnMode: {
        position: 'absolute',
        left: 'calc(33% - 60px)',
        top: 50,
        zIndex: 99,
    },
    button: {
        width: '90%',
        margin: `${theme.spacing(1)}px 0`
    },
    wrapperButton: {
        width: '90%',
        '& > span': {
            width: '100%'
        },
    },
    input: {
        display: 'none',
    },
    demo: {
        backgroundColor: fade(theme.palette.secondary.main, .15),
        margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        borderRadius: 4,
    },
}))

export const MyProfile: FC<PropsType> = memo(() => {
    const profile = useSelector(getMyProfile)
    const defaultAvatar = useSelector(getDefaultAvatarUsers)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.up('md'))

    const avatarUrl = profile?.photos && profile?.photos.large ? profile?.photos.large : defaultAvatar
    const classes = useStyles({avatarUrl})

    const [columnAnim, setColumnAnim] = useState(true)

    // Animate Components Start
    const [propsInfoWrapperAnim, setInfoWrapperAnim] = useSpring(() => ({
        width: '31%',
        padding: isMobile ? 10 : 2,
        borderRightWidth: 2,
    }))

    setInfoWrapperAnim({
        width: columnAnim ? '31%' : '0%',
        padding: columnAnim ? 10 : 0,
        borderRightWidth: columnAnim ? 2 : 0,
        config: {mass: 1, tension: 170, friction: 26}
    })

    const [propsInfoAnim, setInfoAnim] = useSpring(() => ({
        opacity: 1,
        config: {mass: 1, tension: 170, friction: 26}
    }))

    setInfoAnim({
        opacity: columnAnim ? 1 : 0,
    })

    const [propsResponseItem, setResponseItem] = useSpring(() => ({
        width: '31%',
        config: {mass: 1, tension: 170, friction: 26}
    }))

    setResponseItem({
        width: !columnAnim ? '62%' : '31%',
    })
    // Animate Components End

    const handlerColumnMode = () => setColumnAnim(!columnAnim)

    return (<>{profile && (
        <Grid container>
            <Grid item md={4} xs={12} container className={clsx(classes.itemWrapper, {[classes.stick]: isMobile})}    >
                <Grid  item xs={12}>
                    <Typography color={'secondary'} variant={"h4"} align={'center'}>
                        {profile.info && profile.info.fullName ? profile.info.fullName : '?????'}
                    </Typography>
                    <Paper className={classes.avatar}  elevation={3} />
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.demo}>
                        <List dense={true}>
                            <ListItem>
                                <ListItemText
                                    primary="Single-line item"
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <EditTwoTone/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </div>
                </Grid>

                <Grid item xs={12} container direction={'column'} alignItems={'center'}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        startIcon={ columnAnim  ? <SpeakerNotesOffTwoTone/> : <SpeakerNotesTwoTone />}
                        onClick={handlerColumnMode}
                    >
                        {columnAnim  ? 'Off ' : 'On ' } Info
                    </Button>

                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="contained-button-file" className={classes.wrapperButton}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            component="span"
                            startIcon={<AccountCircleTwoTone/>}
                        >
                            Update Avatar
                        </Button>
                    </label>

                    <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        startIcon={ <ListAltTwoTone />}
                        onClick={handlerColumnMode}
                    >
                        Update Info
                    </Button>
                </Grid>
            </Grid>

            {profile.info && // Info from profile column
                <>
                    {isMobile
                        ? (
                            <animated.div
                                style={propsInfoWrapperAnim}
                                className={clsx(classes.itemWrapper, {[classes.stick]: isMobile})}
                            >
                                <animated.div style={propsInfoAnim}>
                                    <ListInfoProfile info={profile.info} />
                                </animated.div>
                            </animated.div>
                        )
                        : (
                            <Grid item xs={12} className={clsx(classes.itemWrapper)}>
                                {/*<ListInfoProfile info={profile.info} />*/}
                            </Grid>
                        )
                    }
                </>
            }

            {isMobile // Posts column
                ? (
                    <animated.div style={propsResponseItem} className={classes.itemWrapper}>
                        Posts
                    </animated.div>
                )
                : (
                    <Grid item xs={12} className={classes.itemWrapper}>
                        Posts
                    </Grid>
                )
            }
        </Grid>
    )}</>)
})
