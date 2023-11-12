import { API } from '../constants/strings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const postSkeleton = (
  url,
  dataToSend,
  params,
  dispatchFalse,
  setLoading,
  setData,
  toast
) => {
  if (dispatchFalse && setLoading) dispatchFalse(setLoading(true))

  AsyncStorage.getItem('token')
    .then((token) => {
      axios
        .post(
          API + url,
          {
            ...dataToSend,
          },
          {
            params: { params },
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then((responseJson) => {
          //Hide Loader
          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))

          // If server response message same as Data Matched
          if (responseJson?.data) {
            setData()
            toast?.show('Successfully Registered', {
              type: 'success',
            })
          }
        })
        .catch((error) => {
          //Hide Loader
          dispatchFalse(setLoading(false))
          if (toast.show)
            toast?.show(error.message, {
              type: 'danger',
            })
        })
    })
    .catch(() => {
      if (toast.show)
        toast?.show('Unauthorized', {
          type: 'danger',
        })
    })
}

export const getSkeleton = (
  url,
  params,
  dispatchFalse,
  setLoading,
  setData,
  toast
) => {
  if (dispatchFalse && setLoading) dispatchFalse(setLoading(true))
  AsyncStorage.getItem('token')
    .then((token) => {
      axios
        .get(API + url, {
          params: { params },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((responseJson) => {
          //Hide Loader
          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
          // If server response message same as Data Matched
          if (responseJson?.data) {
            setData(responseJson?.data)
          }
        })
        .catch((error) => {
          //Hide Loader
          console.log(error)
          dispatchFalse(setLoading(false))
          if (toast.show)
            toast?.show(error?.request?.statusText || error.message, {
              type: 'danger',
            })
        })
    })
    .catch(() => {
      if (toast.show)
        toast?.show('Unauthorized', {
          type: 'danger',
        })
    })
}

export const isLoggedIn = async () => {
  let foundToken = false
  await AsyncStorage.getItem('token')
    .then((token) => {
      if (token) {
        foundToken = true
      }
    })
    .finally(() => {
      return foundToken
    })
  return foundToken
}
