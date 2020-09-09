// Mat Component
import {createMuiTheme} from "@material-ui/core"
// Mat Color
import {cyan, grey, pink, yellow} from '@material-ui/core/colors'


export const themeDark = () => createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: '#00cdb2',
            main: grey['900'],
            dark: '#6e3759',
            contrastText: '#fff',
        },
        secondary: {
            main: yellow['500'],
            contrastText: grey['900'],
        },
        error: {
            main: pink['900'],
            contrastText: yellow['500'],
        },
        action: {
            active: cyan['A200'],
            hover: cyan['900'],

        },
    },
})

export const themeLight = () => createMuiTheme({
    palette: {
        type: 'light'
    }
})