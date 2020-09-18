// Mat Component
import {createMuiTheme} from "@material-ui/core"
// Mat Color
import {blueGrey, cyan, grey, red, yellow} from '@material-ui/core/colors'


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
            dark: yellow['500'],
            light: yellow['500'],
            contrastText: grey['900'],
        },
        error: {
            main: red['A400'],
            contrastText: yellow['500'],
        },
        action: {
            active: cyan['A200'],
            hover: blueGrey['900'],
        },
        info: {
            main: cyan['900'],
        },
        success: {
            main: yellow['500'],
        },
        background: {
        },
    },
})

export const themeLight = () => createMuiTheme({
    palette: {
        type: 'light'
    }
})