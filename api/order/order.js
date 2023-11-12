import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getOrders = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/order', null, dispatchFalse, setFetching, setData, toast)
}

export const getOrderTypes = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/ordertype', null, dispatchFalse, setFetching, setData, toast)
}
