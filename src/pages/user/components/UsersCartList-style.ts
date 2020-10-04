// Core
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


type StyleType = {
    img: string
}

export const useStyles = makeStyles<Theme, StyleType>((theme) => createStyles({
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