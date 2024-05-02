import { API } from '../constants/strings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Platform } from 'react-native'

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
          API + convertUrl(url),
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
          //Hide Loader

          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
          if (setPosting) {
            setPosting(false)
          }
          console.log('Error At Post : ', API + convertUrl(url))
          console.log(error)
          console.log(error?.response?.data)
          const err = error?.response?.data
          if (err?.toString()?.length < 300 && err) {
            Object.entries(err)?.map(([key, value]) => {
              if (value?.length < 45) {
                toast.show(`${key} error : ${value}`, {
                  type: 'danger',
                })
              }
            })
          }
          if (toast.show)
            toast?.show(errorMsg ?? 'Unable To Save', {
              type: 'danger',
            })
        })
    })
    .catch(() => {
      console.log('Error At Outer Post : ', API + convertUrl(url))
      console.log(error)
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

export const putSkeleton = (
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
        .put(
          API + convertUrl(url),
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
          // console.log('Put Response : ', responseJson)
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
          //Hide Loader
          if (dispatchFalse && setLoading) {
            console.log('Loading False')
            dispatchFalse(setLoading(false))
          }
          if (setPosting) {
            setPosting(false)
          }
          console.log('Error At Put : ', API + convertUrl(url))
          console.log(error)
          const err = error?.response?.data
          if (err?.toString()?.length < 300 && err) {
            console.log(error?.response?.data)
            Object.entries(err)?.map(([key, value]) => {
              if (value?.length < 45) {
                toast.show(`${key} error : ${value}`, {
                  type: 'danger',
                })
              }
            })
          }

          if (toast.show)
            toast?.show(errorMsg ?? 'Unable To Update', {
              type: 'danger',
            })
        })
    })
    .catch((err) => {
      console.log('Error At Outer Put : ', API + convertUrl(url))
      console.log(err)
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
        .get(API + convertUrl(url), {
          params: { params },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((responseJson) => {
          //Hide Loader
          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
          if (setGetting) {
            setGetting(false)
          }
          // If server response message same as Data Matched
          if (responseJson?.data) {
            setData(responseJson?.data)
          }
        })
        .catch((error) => {
          //Hide Loader
          console.log('Error At Get : ', API + convertUrl(url))
          console.log(error)
          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
          if (setGetting) {
            setGetting(false)
          }
          if (toast.show)
            toast?.show(error?.request?.statusText || error.message, {
              type: 'danger',
            })
        })
    })
    .catch((error) => {
      console.log('Error At Outer Get : ', API + convertUrl(url))
      console.log(error)
      if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
      if (setGetting) {
        setGetting(false)
      }
      if (toast.show)
        toast?.show('Unauthorized', {
          type: 'danger',
        })
    })
}

export const deleteSkeleton = (
  url,
  params,
  dispatchFalse,
  setLoading,
  toast,
  onSuccess
) => {
  if (dispatchFalse && setLoading) dispatchFalse(setLoading(true))

  AsyncStorage.getItem('token')
    .then((token) => {
      axios
        .delete(API + convertUrl(url), {
          params: { params },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((responseJson) => {
          //Hide Loader
          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))

          // If server response message same as Data Matched
          if (responseJson.status === 204) {
            if (onSuccess) {
              onSuccess()
            }
            toast?.show('Successfully Deleted', {
              type: 'success',
            })
          }
        })
        .catch((error) => {
          console.log('Error At Delete : ', API + convertUrl(url))
          console.log(error)
          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
          //Hide Loader

          if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))
          if (toast?.show)
            toast?.show(error?.request?.statusText || error.message, {
              type: 'danger',
            })
        })
    })
    .catch(() => {
      console.log('Error At Outer Delete : ', API + convertUrl(url))
      console.log(error)
      if (dispatchFalse && setLoading) dispatchFalse(setLoading(false))

      if (toast?.show)
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

const convertUrl = (url) => {
  console.log('URL:', url)
  return url

  try {
    if (Platform.OS == 'ios') {
      return url
    } else {
      if (url?.charAt(url?.length - 1) == '/')
        return url.substring(0, url.length - 1)
    }
  } catch (err) {
    console.log('Error at converting url ')
    console.log(err)
    return url
  }
}
