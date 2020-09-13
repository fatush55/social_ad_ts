// Type
import { UsersType } from "../types/types"

export const actionsUser = {
    fallowUser: (id: number) => ({type: 'USER/FALLOWED', id} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'USER/SET_USERS', users} as const),
    setTotalUsers: (total: number) => ({type: 'USER/SET_TOTAL_USERS', total} as const),
    setCurrencyPage: (page: number) => ({type: 'USER/SET_CURRENCY_PAGE', page}) as const,
    setSizePage: (size: number) => ({type: 'USER/SET_SIZE_PAGE', size}) as const,
    setSearchStringUser: (search: string) =>  ({type: 'USER/SET_SEARCH_STRING_USER', payload: {search} } as const),
    setSearchTypeUser: (type: 'all' | 'follow' | 'other') =>  ({type: 'USER/SET_SEARCH_TYPE_USER', payload: {type} } as const),
    setViewItem: (view: 'module' | 'list') =>  ({type: 'USER/SET_VIEW_ITEM', payload: view } as const),
    triggerLoadingUsers: (isLoading: boolean) => ({type: 'USER/TRIGGER_LOADING_USERS', isLoading} as const),
    triggerFollowProgress: (id: number, progress: boolean) => ({type: 'USER/TRIGGER_FALLOW_PROGRESS', id, progress} as const)
}