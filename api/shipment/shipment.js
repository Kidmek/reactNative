import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getShipments = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/shipmentStatus/' + params,
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getTransportations = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/transportation',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getTransportationMethods = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton(
    '/transportationType',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getShipmentTerms = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/shipmentterms',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
