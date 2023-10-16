import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

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
