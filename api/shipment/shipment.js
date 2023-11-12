import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getShipments = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/shipments/', null, dispatchFalse, setFetching, setData, toast)
}

export const getTransportations = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/transportations/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getVehicles = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/vehicles/', null, dispatchFalse, setFetching, setData, toast)
}

export const getTransportationMethods = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton(
    '/transportationtypes/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getTransportationCompanies = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton(
    '/transportationcompany/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getShipmentTypes = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/shipmenttype/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getShipmentTerms = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/shipmentterms/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getPorts = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/ports/', null, dispatchFalse, setFetching, setData, toast)
}

export const getTransits = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/transitory/', null, dispatchFalse, setFetching, setData, toast)
}
