import { setFetching, setLoading } from '../../features/data/dataSlice'
import { getSkeleton, postSkeleton } from '../apiConfig'

export const getOffices = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/offices/', params, dispatchFalse, setFetching, setData, toast)
}

export const getOfficeDetail = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/offices/' + params + '/',
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getOfficeEquipments = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/officeequipments/',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const addOffice = (data, dispatchFalse, toast, onSuccess) => {
  postSkeleton(
    '/offices/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Successfully Created.',
    {}
  )
}
export const addOfficeEquipment = (
  data,
  dispatchFalse,
  toast,
  onSuccess,
  headers
) => {
  postSkeleton(
    '/officeequipments/',
    data,
    null,
    dispatchFalse,
    setLoading,
    onSuccess,
    toast,
    null,
    'Successfully Created.',
    headers
  )
}
