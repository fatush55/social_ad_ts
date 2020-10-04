// Core
import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";


type StyleType = {
    drawerMode: boolean
}

export const useStyles = makeStyles<Theme, StyleType>((theme) => createStyles({
    wrapper: {
        position: 'fixed',
        zIndex: 99,
        width: props => !props.drawerMode ? 'calc(100% - 105px)' : 'calc(100% - 268px)',
        [theme.breakpoints.up('md')]: {
            width: props => !props.drawerMode ? 'calc(70% - 105px)' : 'calc(70% - 268px)',
            marginLeft: '15%',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        height: 50,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        height: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(6)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: 16,
    },
    searchProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
    },
}))