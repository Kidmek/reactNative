import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

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
