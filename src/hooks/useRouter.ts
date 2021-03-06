// Core
import {useMemo} from "react"
import {useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom'
import queryString  from 'query-string'


export const useRouter = () => {
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const match = useRouteMatch()

    return useMemo(() => {
        return {
            push: history.push,
            replace: location.pathname,
            query: {
                ...queryString.parse(location.search),
                ...params,
            }
        }
    }, [history, location, params, match])
}
