// Root
import React, {FC} from "react"
// Materialize Components
import {Badge, IconButton, Menu, MenuItem} from '@material-ui/core'
// Materialize Icon
import {AccountCircleTwoTone, EmailTwoTone} from '@material-ui/icons'


type PropsType = {
    mobileMenuId: string
    mobileMoreAnchorEl: null | HTMLElement
    handleMobileMenuClose: () => void
    handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void
}

export const NavbarMobileMenu: FC<PropsType> = (props) => {
    const {mobileMenuId, mobileMoreAnchorEl, handleMobileMenuClose, handleProfileMenuOpen} = props
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color='secondary'>
                    <Badge badgeContent={4} color='error'>
                        <EmailTwoTone />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color='secondary'
                >
                    <AccountCircleTwoTone />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    )
}
