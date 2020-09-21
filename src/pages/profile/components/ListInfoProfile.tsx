// Root
import React, {FC, memo} from "react"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
// Materialize Components
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core"
// Materialize Icon
import {Facebook, GitHub, Info, Instagram, Language, Link as LinkIcon, Twitter, Work, YouTube} from "@material-ui/icons"
// Type
import {InfoType} from "../../../types/auth-reducer-type"
import {ContactsType} from "../../../types/types"


type PropsType = {
    info: InfoType
}

type ContactIconsType = 'facebook' | 'github' | 'instagram' | 'mainLink' | 'twitter'
    | 'vk' | 'website' | 'youtube' | 'lookingForAJob' | 'aboutMe' | 'lookingForAJobDescription'

type  RestInfoType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

const useStyles = makeStyles<Theme>((theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        height: 'calc(100vh - 270px)',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: 0
        },
        [theme.breakpoints.down('md')]: {
            height: '100%',
            overflowY: 'hidden',
        }
    },
}))

const contactIcons = (type: ContactIconsType) => {
    switch (type) {
        case "aboutMe": return <Info/>
        case "lookingForAJob": return <Work/>
        case "lookingForAJobDescription": return <Work/>

        case 'facebook': return <Facebook/>
        case 'github': return <GitHub/>
        case 'instagram': return <Instagram/>
        case 'mainLink': return <LinkIcon />
        case 'twitter': return <Twitter/>
        case 'vk': return <Typography variant={'h6'}>Vk</Typography>
        case 'website': return  <Language />
        case 'youtube': return <YouTube/>
    }
}

export const ListInfoProfile: FC<PropsType> = memo(({info}) => {
    const classes = useStyles()
    const {contacts, fullName, ...restInfo} = info

    return (
        <List className={classes.root}>
            {restInfo && Object.keys(restInfo).map((value: any) => {
                const content = restInfo[value as keyof RestInfoType]
                    ? restInfo[value as keyof RestInfoType] !== 'lookingForAJob'
                        ? restInfo[value as keyof RestInfoType]
                        : 'Yes'
                    : 'NO'

                return (
                    <div key={value}>
                        <ListItem >
                            <ListItemAvatar>
                                <Avatar>
                                    {contactIcons(value)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={ <span>{content}</span>}/>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                )
            })}
            {contacts && Object.keys(contacts).map((value: any, key) => {
                const content = contacts && contacts[value as keyof ContactsType] ? contacts[value as keyof ContactsType] : 'NO'

                return (
                    <div key={value}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    {contactIcons(value)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={ <span>{content}</span>}/>
                        </ListItem>
                        {
                            (Object.keys(contacts).length -1) !== key &&  <Divider variant="inset" component="li" />
                        }
                    </div>
                )
            })}
        </List>
    )
})
