// Core
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme: Theme) => createStyles({
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