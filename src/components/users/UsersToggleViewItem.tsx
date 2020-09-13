// Root
import React, {FC, memo, MouseEvent} from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
// Mat Components
import {Hidden} from '@material-ui/core'
// Mat Icon
import {ViewList as ViewListIcon, ViewModule as ViewModuleIcon} from '@material-ui/icons'
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {setViewItem} from "../../thunks/user-thunk";
import {useDispatch, useSelector} from "react-redux";
import {getIsViewItem} from "../../selectors/users-selector";


type PropsType = {}

type StyleType = {}

const useStyles = makeStyles<Theme & StyleType>((theme) => createStyles({
    toggleBtn: {
        float: 'right',
        marginRight: 50
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
