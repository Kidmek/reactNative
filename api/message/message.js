import { getSkeleton, postSkeleton, putSkeleton } from '../msgConfig'
import { getSkeleton as get, postSkeleton as post } from '../apiConfig'
import { setFetching } from '../../features/data/dataSlice'

export const getAllUser = (params, dispatchFalse, setData, toast) => {
  get('/allusers/', params, dispatchFalse, setFetching, setData, toast)
}

export const getAllConversations = (params, dispatchFalse, setData, toast) => {
  getSkeleton(
    '/conversations',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getSingleConversations = (
  params,
  dispatchFalse,
  setData,
  toast
) => {
  getSkeleton(
    '/conversations',
    params,
    dispatchFalse,
    setFetching,
    setData,
    toast
  )
}
export const getConversationMsgs = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/messages', params, dispatchFalse, setFetching, setData, toast)
}
export const markConversationSeen = (
  params,
  dispatchFalse,
  onSuccess,
  toast
) => {
  putSkeleton(
    '/conversations',
    null,
    params,
    dispatchFalse,
    setFetching,
    onSuccess,
    toast
  )
}
export const createConversation = (data, dispatchFalse, onSuccess, toast) => {
  postSkeleton(
    '/conversations',
    data,
    null,
    dispatchFalse,
    setFetching,
    onSuccess,
    toast
  )
}

export const sendMessage = (data, dispatchFalse, onSuccess, toast) => {
  postSkeleton(
    '/messages',
    data,
    null,
    dispatchFalse,
    setFetching,
    onSuccess,
    toast
  )
}
export const searchCustomers = (params, dispatchFalse, setData, toast) => {
  getSkeleton('/users', params, dispatchFalse, setFetching, setData, toast)
}

export const addUser = (data, dispatchFalse, setData, toast) => {
  postSkeleton(
    '/users',
    data,
    null,
    dispatchFalse,
    setFetching,
    () => {
      console.log(data?.email, ' Created')
    },
    toast
  )
}
