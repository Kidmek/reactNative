import { API } from '../constants/strings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const postSkeleton = (
  url,
  dataToSend,
  params,
  dispatchFalse,
  setLoading,
  onSuccess,
  toast,
  setPosting,
  successMsg,
  headers,
  errorMsg
) => {
  if (dispatchFalse && setLoading) dispatchFalse(setLoading(true))
  if (setPosting) {
    setPosting(true)
  }
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
          if (setPosting) {
            setPosting(false)
          }
          console.log(responseJson)
          // If server response message same as Data Matched
          if (responseJson?.data) {
            if (onSuccess) {
              onSuccess()
            }
            toast?.show(successMsg ?? 'Successfully Saved', {
              type: 'success',
            })
          }
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response)
          console.log(error.response?.data)
          //Hide Loader
          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
          if (setPosting) {
            setPosting(false)
          }
          if (toast.show)
            toast?.show(errorMsg ?? 'Unable To Save', {
              type: 'danger',
            })
        })
    })
    .catch(() => {
      if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
      if (setPosting) {
        setPosting(false)
      }
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
  toast,
  setGetting
) => {
  if (dispatchFalse && setLoading) dispatchFalse(setLoading(true))
  if (setGetting) {
    setGetting(true)
  }
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
          if (setGetting) {
            setGetting(true)
          }
          // If server response message same as Data Matched
          if (responseJson?.data) {
            setData(responseJson?.data)
          }
        })
        .catch((error) => {
          //Hide Loader
          console.log(error)
          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
          if (setGetting) {
            setGetting(true)
          }
          if (toast.show)
            toast?.show(error?.request?.statusText || error.message, {
              type: 'danger',
            })
        })
    })
    .catch(() => {
      if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
      if (setGetting) {
        setGetting(true)
      }
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

export const getUser = async () => {
  const user = await AsyncStorage.getItem('user_id')
  return JSON.parse(user)
}

export const logout = async () => {
  await AsyncStorage.removeItem('user_id')
  await AsyncStorage.removeItem('token')
}
