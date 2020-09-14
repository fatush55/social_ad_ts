// Root
import React, {FC, memo, MouseEvent} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {useDispatch, useSelector} from "react-redux"
// Materialize Components
import {Hidden} from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab"
// Materialize Icon
import {ViewList as ViewListIcon, ViewModule as ViewModuleIcon} from '@material-ui/icons'
// Thunk
import {setViewItem} from "../../thunks/user-thunk"
// Selector
import {getIsViewItem} from "../../selectors/users-selector"


type PropsType = {}

type StyleType = {}

const useStyles = makeStyles<Theme & StyleType>((theme) => createStyles({
    toggleBtn: {
        float: 'right',
        marginRight: 50,
        [theme.breakpoints.down('md')]: {
            marginRight: 20,
        },
    },
    toggleBtnItem : {
        padding: 13
    }
}))

export const UsersToggleViewItem: FC<PropsType> = memo(() => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const viewItem = useSelector(getIsViewItem)

    const handleChange = (event: MouseEvent<HTMLElement>, nextView: 'module' | 'list') => dispatch(setViewItem(nextView))

    return (
        <div className={classes.toggleBtn}>
            <Hidden smDown>
                <ToggleButtonGroup orientation="horizontal" value={viewItem} exclusive onChange={handleChange}>
                    <ToggleButton value="list" aria-label="list" className={classes.toggleBtnItem}>
                        <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="module" aria-label="module" className={classes.toggleBtnItem}>
                        <ViewModuleIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Hidden>
        </div>
    )
})
