import { setFetching } from '../features/data/dataSlice'
import { getSkeleton } from './apiConfig'

export const getAllUser = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/allusers', params, dispatchFalse, setFetching, setData, toast)
}
