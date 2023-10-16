import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getReceptions = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/receptions', params, dispatchFalse, setFetching, setData, toast)
}

export const getReceptionEquipments = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton('/equipments', params, dispatchFalse, setFetching, setData, toast)
}
