// Api
import { instance, ResponseItemApiType, ResponseApiType } from "./api"
// Type
import  {UsersType } from "../types/types"


export const userApi = {
    getUsers(currentPage = 1, sizePage = 20, search = '', type = 'all') {
        const query = search.length ? `&term=${search}` : ''
        const typeQuery = type === 'all' ? '' : type === 'follow' ? `&friend=${true}` : `&friend=${false}`

        return instance.get<ResponseItemApiType<UsersType>>(`users?page=${currentPage}&count=${sizePage}${query}${typeQuery}`).then(res => res.data)
    },
    setFollowed(type: 'follow' | 'unFollow', id: number) {
        switch (type) {
            case 'follow':
                return instance.post<ResponseApiType>(`follow/${id}`).then(res => res.data)
            case 'unFollow':
                return instance.delete<ResponseApiType>(`follow/${id}`).then(res => res.data)
        }
    },
}
