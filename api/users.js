import { setFetching, setLoading } from '../features/data/dataSlice'
import { getSkeleton, postSkeleton } from './apiConfig'

export const getAllUser = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/allusers/', params, dispatchFalse, setFetching, setData, toast)
}
export const getAllGroups = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/groups/', params, dispatchFalse, setFetching, setData, toast)
}
export const addGroups = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/groups/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Successfully Created'
  )
}

export const addStaff = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/staff/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Successfully Created'
  )
}
export const getAllPermissions = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/permission/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
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
