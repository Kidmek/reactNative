import { setData, setFetching, setLoading } from '../../features/data/dataSlice'
import {
  deleteSkeleton,
  getSkeleton,
  postSkeleton,
  putSkeleton,
} from '../apiConfig'

export const getShipments = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/shipments/', null, dispatchFalse, setFetching, setData, toast)
}

export const getSingleShipment = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/shipments/' + params + '/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const updateSingleShipment = (
  params,
  data,
  dispatchFalse,
  onSuccess,
  toast
) => {
  putSkeleton(
    '/shipments/' + params + '/',
    data,
    params,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}

export const deleteSingleShipment = (
  params,
  dispatchFalse,
  onSuccess,
  toast
) => {
  deleteSkeleton(
    '/shipments/' + params + '/',
    params,
    dispatchFalse,
    setLoading,
    toast,
    onSuccess
  )
}
export const getDrivers = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/drivers/', null, dispatchFalse, setFetching, setData, toast)
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
export const addDriverTrans = (data, id, dispatchFalse, toast, onSuccess) => {
  putSkeleton(
    '/drivers/' + id + '/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
  )
}
export const addTransCompany = (data, id, dispatchFalse, toast, onSuccess) => {
  putSkeleton(
    '/transportationcompany/' + id + '/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
  )
}
export const addVehicles = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/vehicles/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
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

export const getVehicleByRange = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/shipments/get_vehicle/' + params + '/',
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
    '/ports/' + params + '/',
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

export const getSingleTransit = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/transitory/' + params + '/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const updateSingleTransit = (
  params,
  data,
  dispatchFalse,
  onSuccess,
  toast
) => {
  putSkeleton(
    '/transitory/' + params + '/',
    data,
    params,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast
  )
}

export const deleteSingleTransit = (
  params,
  dispatchFalse,
  onSuccess,
  toast
) => {
  deleteSkeleton(
    '/transitory/' + params + '/',
    params,
    dispatchFalse,
    setLoading,
    toast,
    onSuccess
  )
}

export const addBusinessLicense = (
  data,
  id,
  dispatchFalse,
  toast,
  onSuccess
) => {
  putSkeleton(
    '/insuranceagent/' + id + '/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null
  )
}
export const registerTransitor = (
  data,
  id,
  dispatchFalse,
  toast,
  onSuccess
) => {
  putSkeleton(
    '/transitor/' + id + '/',
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
