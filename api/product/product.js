import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getAllProducts = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/products/', params, dispatchFalse, setFetching, setData, toast)
}

export const getReturnedProducts = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/returnedproducts/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getProductTypes = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/producttypes/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getProductCategories = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/categories/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getDamagedProducts = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/damagedproducts/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
