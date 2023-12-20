import { setFetching, setLoading } from '../../features/data/dataSlice'
import { getSkeleton, postSkeleton } from '../apiConfig'

export const getWarehouses = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/warehouse/',
    params + '/',
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const addWarehouse = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/warehouse/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}

export const getManaged = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/mapedWarehouse',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getWarehouseDetails = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/warehouse/' + params + '/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getManagedWarehouseDetails = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton(
    '/organizedWarehouse/' + params + '/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
