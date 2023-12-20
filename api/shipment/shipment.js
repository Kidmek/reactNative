import { setFetching, setLoading } from '../../features/data/dataSlice'
import { getSkeleton, postSkeleton } from '../apiConfig'

export const getShipments = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/shipments/', null, dispatchFalse, setFetching, setData, toast)
}

export const addShipment = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/shipments/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Shipment Placed'
  )
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
export const addTransportation = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/transportations/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
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

export const addShipmentMethod = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/transportationtypes/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
  )
}
export const addShipmentType = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/shipmenttypes/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
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

export const getPortAgents = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/ports/' + params,
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getTransits = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/transitory/', null, dispatchFalse, setFetching, setData, toast)
}

export const addTransits = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/transitory/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
  )
}
export const addPort = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/ports/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
  )
}
