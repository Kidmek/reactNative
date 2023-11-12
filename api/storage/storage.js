import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getStorages = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/storagetype',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getMappedStorages = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/warehousestoragemapping',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getMappedStorageDetails = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton(
    '/warehousestoragemapping/' + params + '/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getShelves = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/shelve', params, dispatchFalse, setFetching, setData, toast)
}

export const getStorageDetail = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/storage/' + params,
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
