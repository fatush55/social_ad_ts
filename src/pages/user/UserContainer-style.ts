// Core
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


type StylesProps = {
    users: number
    viewItem: 'module' | 'list'
}

export const useStyles = makeStyles<Theme, StylesProps>((theme) => createStyles({
    root: {
        marginTop: 70,
        height: props => {
            return props.viewItem === 'module'
                ? props.users > 10 ? 'auto' : '100vh'
                : props.users > 5 ? 'auto' : '100vh'
        }
    },
}))