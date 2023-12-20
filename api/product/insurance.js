import { setFetching, setLoading } from '../../features/data/dataSlice'
import { getSkeleton, postSkeleton } from '../apiConfig'

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
