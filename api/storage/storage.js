import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getStorages = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/storage', params, dispatchFalse, setFetching, setData, toast)
}

export const getShelves = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/shelvetypes',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
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
