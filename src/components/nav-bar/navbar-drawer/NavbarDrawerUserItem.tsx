// Root
import React, {FC, memo} from "react"
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles"
import {FixedSizeList, ListChildComponentProps} from "react-window"
// Materialize Components
import {Avatar, ListItem, ListItemAvatar, ListItemText, Tooltip, Zoom} from "@material-ui/core"
// Materialize Icon
import {useSelector} from "react-redux"
// Selector
import {getDefaultAvatarUsers, getDrawerMode, getFollowingUsersProfile} from "../../../selectors/app-selector"
import {getIsAuth} from "../../../selectors/auth-selector";


type PropsType = {}

type StyleType = {}

const useStyles = makeStyles<Theme & StyleType>((theme) => createStyles({
    scroll: {
        height: 'calc(100vh - 250px) !important',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: 0,
        },
    },
    name: {
       '& span': {
           overflow: 'hidden',
           textOverflow: 'ellipsis'
       }
    },
}))

const MyTooltip  = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.secondary.main,
        color: 'rgb(0, 0, 0)',
        maxWidth: 'auto',
        fontSize: theme.typography.pxToRem(14),
        border: `1px solid ${theme.palette.secondary.main}`,
    },
    arrow: {
        color: theme.palette.secondary.main,
    }
}))(Tooltip)

const UserItem = (props: ListChildComponentProps) => {
    const classes = useStyles()
    const {index, style, data} = props
    const profile = data.users[index]

    return (
        <MyTooltip
            title={profile.name}
            placement={'right'}
            arrow TransitionComponent={Zoom}
            disableHoverListener={data.drawerMode}
        >
            <ListItem button style={style} key={index}>
                <ListItemAvatar>
                    <Avatar
                        alt={'ava'}
                        src={profile.photos && profile.photos.large ? profile.photos.large : data.defaultAvatar}
                    />
                </ListItemAvatar>
                <ListItemText primary={profile.name} className={classes.name}/>
            </ListItem>
        </MyTooltip>
    )
}

export const NavbarDrawerUserItem: FC<PropsType> = memo((props) => {
    const classes = useStyles()
    const avatar = useSelector(getDefaultAvatarUsers)
    const users = useSelector(getFollowingUsersProfile)
    const drawerMode = useSelector(getDrawerMode)
    const isAuth = useSelector(getIsAuth)

    return (
        <>
            {
                isAuth && (
                    <FixedSizeList
                        className={classes.scroll}
                        height={400}
                        width={'100%'}
                        itemSize={46}
                        itemCount={users.length}
                        useIsScrolling={false}
                        itemData={{defaultAvatar: avatar, users, drawerMode}}
                    >
                        {UserItem}
                    </FixedSizeList>
                )
            }
        </>
    )
})
