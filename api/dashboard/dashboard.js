import { setFetching } from '../../features/data/dataSlice'
import { getSkeleton } from '../apiConfig'

export const getDashboardData = (
  params,
  dispatchFalse,
  setDashboardData,
  toast
) => {
  getSkeleton(
    '/admindashboard',
    params,
    dispatchFalse,
    setFetching,
    setDashboardData,
    toast
  )
}
