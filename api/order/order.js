import { setFetching, setLoading } from '../../features/data/dataSlice'
import { getSkeleton, postSkeleton } from '../apiConfig'

export const getOrders = (
  params,
  dispatchFalse,
  setData,
  toast,
  setGetting
) => {
  getSkeleton(
    '/order',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast,
    setGetting ?? null
  )
}
export const addOrder = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/order/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Order Placed'
  )
}

export const getOrderTypes = (
  params,
  dispatchFalse,
  setData,
  toast,
  setGetting
) => {
  getSkeleton(
    '/ordertype',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast,
    setGetting ?? null
  )
}
