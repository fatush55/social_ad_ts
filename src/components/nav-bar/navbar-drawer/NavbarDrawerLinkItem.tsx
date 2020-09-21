// Root
import React, {FC, memo} from "react"
import {NavLink} from "react-router-dom"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import clsx from "clsx"
import {useSelector} from "react-redux"
// Materialize Components
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
// Materialize Icon
import {PeopleAltTwoTone, RecentActors, SpeakerNotesTwoTone} from '@material-ui/icons'
// Selector
import {getIsAuth} from "../../../selectors/auth-selector"


type PropsType = {
    to: string
    title: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    itemLink: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
    },
    itemLinkAction: {
        '& svg': {
            color: theme.palette.action.active,
        }
    },
    disabledLink: {
        pointerEvents: 'none',
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

export const NavbarDrawerLinkItem: FC<PropsType> = memo(({to, title}) => {
    const classes = useStyles()
    const isAuth = useSelector(getIsAuth)
    const isDisabled = !isAuth && to !== '/users'
    const linkClasses = clsx({[classes.itemLink]: true, [classes.disabledLink]: isDisabled})

    return (
        <NavLink to={to} className={linkClasses} activeClassName={classes.itemLinkAction}>
            <ListItem button disabled={isDisabled}>
                <ListItemIcon>
                    {selectIcon(to)}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
        </NavLink>
    )
})
