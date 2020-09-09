// Root
import React, {FC, memo} from "react"
import {NavLink} from "react-router-dom"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
// Mat Components
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
// Mat Icon
import {PeopleAltTwoTone, RecentActors, SpeakerNotesTwoTone} from '@material-ui/icons'


type PropsType = {
    to: string
    title: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    itemLink: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText
    },
    itemLinkAction: {
        '& svg': {
            color: theme.palette.action.active,
        }
    }
}))

const selectIcon = (to: string) => {
    const color = 'secondary'

    switch (to) {
        case '/profile' : return <RecentActors color={color} />
        case '/dialog' : return <SpeakerNotesTwoTone color={color} />
        case '/users' : return <PeopleAltTwoTone color={color} />
    }
}

export const NavbarDrawerLInkItem: FC<PropsType> = memo(({to, title}) => {
    const classes = useStyles()

    return (
        <NavLink to={to} className={classes.itemLink} activeClassName={classes.itemLinkAction}>
            <ListItem button>
                <ListItemIcon>
                    {selectIcon(to)}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
        </NavLink>
    )
})
