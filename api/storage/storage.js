import { setFetching, setLoading } from '../../features/data/dataSlice'
import { getSkeleton, postSkeleton } from '../apiConfig'

export const getStorages = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/storagetype/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getMappedStorages = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/warehousestoragemapping/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const addStorageType = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/storagetype/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Successfully Created.',
    {}
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
  getSkeleton('/shelve/', params, dispatchFalse, setFetching, setData, toast)
}

export const addShelveType = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/shelve/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Successfully Created.',
    {}
  )
}

export const getStorageDetail = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/storage/' + params + '/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
