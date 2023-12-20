import { setFetching, setLoading } from '../../features/data/dataSlice'
import { getSkeleton, postSkeleton } from '../apiConfig'

export const getAllProducts = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/products/', params, dispatchFalse, setFetching, setData, toast)
}
export const addProduct = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/products/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}

export const addReturnedProduct = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/returnedproducts/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}
export const addDamagedProduct = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/damagedproducts/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}
export const addProductCategory = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/categories/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}
export const addProductType = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/producttypes/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}
export const getProductDetails = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/products/' + params + '/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
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
