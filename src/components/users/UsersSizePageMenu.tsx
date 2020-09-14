// Root
import React, {FC, memo, useEffect, useState} from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from "react-redux"
// Materialize Components
import {Button, Hidden, Menu, MenuItem, Paper} from '@material-ui/core'
// Materialize Icon
import {ExpandLess as ExpandLessIcon} from '@material-ui/icons'
// Thunk
import {setSizePageUser} from "../../thunks/user-thunk"
// Selector
import {getSearchUsers} from "../../selectors/users-selector"


type PropsType = {}

type StyleType = {}

const useStyles = makeStyles<Theme & StyleType>((theme) => createStyles({
    menu: {
        float: 'right',
        marginRight: '25%',
        [theme.breakpoints.down('md')]: {
            marginRight: 50,
        },
        marginTop: 10,
    }
}))

export const UsersSizePageMenu: FC<PropsType> = memo(() => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const searchUsers = useSelector(getSearchUsers)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleSizePage = (value: number) => {
        setAnchorEl(null)
        dispatch(setSizePageUser(value))
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            window.screen.width < 768 && dispatch(setSizePageUser(20))
        })
    },[dispatch])


    return (
        <Hidden smDown>
            <div className={classes.menu}>
                <div>
                    <Paper elevation={3}>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            color={'secondary'}
                            startIcon={<ExpandLessIcon/>}
                        >
                            {searchUsers.sizePage}
                        </Button>
                    </Paper>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleSizePage(10)}>10</MenuItem>
                        <MenuItem onClick={() => handleSizePage(20)}>20</MenuItem>
                        <MenuItem onClick={() => handleSizePage(50)}>50</MenuItem>
                        <MenuItem onClick={() => handleSizePage(100)}>100</MenuItem>
                    </Menu>
                </div>
            </div>
        </Hidden>
    )
})
