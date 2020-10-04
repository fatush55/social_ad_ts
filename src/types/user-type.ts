export type SearchUsersType = {
    currentPage: number,
    sizePage: number,
    search: string,
    type: 'all' | 'follow' | 'other'
}