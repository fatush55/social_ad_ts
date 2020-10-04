// Type
import { UsersType } from "../types/types"

// Saga Watcher Action
export const USER_WATCH_SET_USER = 'USER_WATCH_SET_USER'
export const USER_WATCH_SET_FOLLOW = 'USER_WATCH_SET_FOLLOW'

export const actionsUser = {
    // Sync
    fallowUser: (id: number) => ({type: 'USER/FALLOWED', id} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'USER/SET_USERS', users} as const),
    setTotalUsers: (total: number) => ({type: 'USER/SET_TOTAL_USERS', total} as const),
    setCurrencyPage: (page: number) => ({type: 'USER/SET_CURRENCY_PAGE', page}) as const,
    setSizePage: (size: number) => ({type: 'USER/SET_SIZE_PAGE', size}) as const,
    setSearchStringUser: (search: string) =>  ({type: 'USER/SET_SEARCH_STRING_USER', payload: {search} } as const),
    setSearchTypeUser: (type: 'all' | 'follow' | 'other') =>  ({type: 'USER/SET_SEARCH_TYPE_USER', payload: {type} } as const),
    setViewItem: (view: 'module' | 'list') =>  ({type: 'USER/SET_VIEW_ITEM', payload: view } as const),
    triggerLoadingUsers: (isLoading: boolean) => ({type: 'USER/TRIGGER_LOADING_USERS', isLoading} as const),
    triggerFollowProgress: (progress: Array<number>) => ({type: 'USER/FALLOW_PROGRESS', payload: {progress}} as const),
    // Async
    watchSetUser: () => ({type: USER_WATCH_SET_USER} as const),
    watchSetFollow: (id: number) => ({type: USER_WATCH_SET_FOLLOW, payload: {id}} as const),
}
