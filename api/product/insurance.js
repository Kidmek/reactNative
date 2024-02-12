import { setFetching, setLoading } from '../../features/data/dataSlice'
import {
  deleteSkeleton,
  getSkeleton,
  postSkeleton,
  putSkeleton,
} from '../apiConfig'

export const getAllInsurance = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/insuranceorder/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getSingleInsurance = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/insuranceorder/' + params + '/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const updateSingleInsurance = (
  params,
  data,
  dispatchFalse,
  onSuccess,
  toast
) => {
  putSkeleton(
    '/insuranceorder/' + params + '/',
    data,
    params,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}

export const deleteSingleInsurance = (
  params,
  dispatchFalse,
  onSuccess,
  toast
) => {
  deleteSkeleton(
    '/insuranceorder/' + params + '/',
    params,
    dispatchFalse,
    setLoading,
    toast,
    onSuccess
  )
}
export const addInsurance = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/insuranceorder/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Successfully Created'
  )
}

export const getAllInsuranceTypes = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/insurancetype/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getAllInsuranceAgents = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton(
    '/insuranceagent/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
