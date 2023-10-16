import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getOffices = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/offices/', params, dispatchFalse, setFetching, setData, toast)
}

export const getOfficeDetail = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/offices/' + params,
    null,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}

export const getOfficeEquipments = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/equipments', params, dispatchFalse, setFetching, setData, toast)
}
