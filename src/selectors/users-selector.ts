// Type
import { RootState } from "../store"


// Casual selectors
export const getUser = (store: RootState) => store.userPage.users
export const getFollowProgress = (store: RootState) => store.userPage.followProgress
export const getTotalUsers = (store: RootState) => store.userPage.totalUsers
export const getSearchUsers = (store: RootState) => store.userPage.searchUser
export const getIsLoadingUsers = (store: RootState) => store.userPage.isLoadingUsers
export const getIsViewItem = (store: RootState) => store.userPage.viewItem

// Reselect