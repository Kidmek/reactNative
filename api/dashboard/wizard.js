import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getServiceOrders = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/allservice', params, dispatchFalse, setFetching, setData, toast)
}
