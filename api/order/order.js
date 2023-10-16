import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getOrders = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/orders', null, dispatchFalse, setFetching, setData, toast)
}

export const getOrderTypes = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/orderTypes', null, dispatchFalse, setFetching, setData, toast)
}
