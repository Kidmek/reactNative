import { setFetching, setLoading } from '../../features/data/dataSlice'
import { deleteSkeleton, getSkeleton, postSkeleton } from '../apiConfig'

export const getServiceOrders = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/allservice', params, dispatchFalse, setFetching, setData, toast)
}

export const getSingleServiceOrders = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton(
    '/allservice/' + params + '/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const deleteSingleServiceOrders = (
  params,
  dispatchFalse,
  toast,
  onSuccess
) => {
  deleteSkeleton(
    '/allservice/' + params + '/',
    null,
    dispatchFalse,
    setLoading,
    toast,
    onSuccess
  )
}

export const addServiceOrders = (data, dispatchFalse, onSuccess, toast) => {
  postSkeleton(
    '/allservice',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}
