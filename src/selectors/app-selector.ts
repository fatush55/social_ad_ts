// Type
import { RootState } from "../store"


// Casual selectors
export const getInitialize = (store: RootState) => store.app.initialize
export const getCurrentProfile = (store: RootState) => store.app.currentProfile
export const getTheme = (store: RootState) => store.app.theme
export const getDrawerMode = (store: RootState) => store.app.drawerMode
export const getAlert = (store: RootState) => store.app.alert
export const getHiddenAlert = (store: RootState) => store.app.hiddenAlert
export const getDefaultAvatarUsers = (store: RootState) => store.app.defaultAvatarUsers
export const getFollowingUsersProfile = (store: RootState) => store.app.fallowingUserProfile

// Reselect