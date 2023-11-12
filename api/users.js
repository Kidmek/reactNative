import { setFetching } from '../features/data/dataSlice'
import { getSkeleton } from './apiConfig'

export const getAllUser = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/allusers/', params, dispatchFalse, setFetching, setData, toast)
}
export const getAllGroups = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/groups/', params, dispatchFalse, setFetching, setData, toast)
}
export const getAllFromGroup = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/groups/' + params + '/',
    '',
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getAllCustomers = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/customer/', params, dispatchFalse, setFetching, setData, toast)
}
