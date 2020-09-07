// Type
import { RootState } from "../store"


// Casual selectors
export const getInitialize = (store: RootState) => store.app.initialize
export const getCurrentProfile = (store: RootState) => store.app.currentProfile
export const getNavbarMode = (store: RootState) => store.app.navbarMode
export const getAlert = (store: RootState) => store.app.alert
export const getHiddenAlert = (store: RootState) => store.app.hiddenAlert

// Reselect