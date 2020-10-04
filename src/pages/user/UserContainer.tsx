// Core
import React, {FC, memo} from "react"
// Materialize Components
import {Grid} from '@material-ui/core'
// Materialize Icon
import {UsersCartModule} from "./components/UsersCartModule/UsersCartModule"
// Style
import {useStyles} from './UserContainer-style'
// Components
import {Paginator} from "../../components/paginator/Paginator"
import {UsersSearchForm} from "./components/UsersSearchForm"
import {UsersCartList} from "./components/UsersCartList"
import {UsersToggleViewItem} from "./components/UsersToggleViewItem/UsersToggleViewItem"
import {UsersSizePageMenu} from "./components/UsersSizePageMenu"
// Hook
import {useUserContainer} from "./useUserContainer"


export const UserContainer: FC = memo(() => {
    const {users, viewItem, isInitialize, searchUsers, countPage} = useUserContainer()
    const classes = useStyles({users: users.length, viewItem})

    return (
        <>
            {!isInitialize && <>
                <UsersSearchForm search={searchUsers.search}/>
                <UsersToggleViewItem />
                <Grid container spacing={4} className={classes.root} justify={ viewItem === 'module' ? 'flex-start' : 'center'}>
                    {
                        viewItem === 'module'
                            ? users.map(elem => <UsersCartModule key={elem.id} {...elem}/>)
                            : users.map(elem => <UsersCartList key={elem.id} {...elem}/>)
                    }
                </Grid>
                <Paginator countPage={countPage} />
                <UsersSizePageMenu />
            </>}
        </>
    )
})
