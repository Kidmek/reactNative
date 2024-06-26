import axios from 'axios'
import { API } from '../../constants/strings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setFetching, setLoading, setUser } from '../../features/data/dataSlice'

export const loginApi = (
  dataToSend,
  dispatchFalse,
  toast,
  setErrortext,
  navigation
) => {
  axios
    .post(API + '/login', {
      ...dataToSend,
    })
    .then((responseJson) => {
      //Hide Loader
      dispatchFalse()
      // If server response message same as Data Matched
      if (responseJson?.data?.token) {
        toast.show('Successfully Logged In', {
          type: 'success',
        })
        AsyncStorage.setItem('user_id', responseJson?.data?.email)
        AsyncStorage.setItem('token', responseJson?.data?.token)
        // console.log(responseJson?.data?.email)
        navigation.navigate('home')
      } else {
        setErrortext('Please check your email or password')
      }
    })
    .catch((error) => {
      //Hide Loader
      console.log(error)
      dispatchFalse()
      let msg = 'Network Error'
      if (error?.response?.data?.message) {
        msg = 'Email Not Registered'
      } else if (error?.response?.data?.error) {
        msg = 'Invalid Password'
      }
      toast.show(msg, {
        type: 'danger',
      })
    })
}

export const signUpApi = (
  dataToSend,
  dispatchFalse,
  toast,
  setErrortext,
  setIsLogin
) => {
  axios
    .post(API + '/register', {
      ...dataToSend,
    })
    .then((responseJson) => {
      //Hide Loader
      dispatchFalse()
      // If server response message same as Data Matched
      if (responseJson?.data?.token) {
        setIsLogin()
        toast.show('Successfully Registered', {
          type: 'success',
        })
      } else {
        setErrortext(responseJson.msg)
      }
    })
    .catch((error) => {
      //Hide Loader
      dispatchFalse()
      toast.show(error.message, {
        type: 'danger',
      })
    })
}

export const getCurrentUser = (dispatchFalse, toast, setData) => {
  dispatchFalse(setFetching(true))
  AsyncStorage.getItem('token').then((token) => {
    if (token) {
      axios
        .get(API + '/currentuser/current_user/', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((responseJson) => {
          //Hide Loader
          dispatchFalse(setFetching(false))

          // If server response message same as Data Matched
          if (responseJson.data?.id) {
            if (setData) {
              setData(responseJson.data)
            }
            console.log('Updating user redux')
            dispatchFalse(setUser(responseJson.data))
          } else {
            console.log('Error At get User ')
            console.log(error)
            if (toast.show) {
              toast.show('Unable To Get User Data', {
                type: 'danger',
              })
            }
          }
        })
        .catch((error) => {
          //Hide Loader
          dispatchFalse(setFetching(false))
          console.log('Error At get User out ')
          console.log(error)
          if (toast.show) {
            toast.show('Unable To Get User Data', {
              type: 'danger',
            })
          }
        })
    } else {
      dispatchFalse(setFetching(false))
      if (toast.show) {
        toast.show('Unauthorized', {
          type: 'danger',
        })
      }
    }
  })
}

export const updateCurrentUser = (id, data, dispatchFalse, toast, setData) => {
  dispatchFalse(setLoading(true))
  AsyncStorage.getItem('token').then((token) => {
    if (token) {
      axios
        .put(
          API + '/currentuser/' + id + '/',
          {
            ...data,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then((responseJson) => {
          //Hide Loader
          dispatchFalse(setLoading(false))

          // If server response message same as Data Matched
          if (responseJson.data?.id) {
            if (setData) {
              setData(responseJson.data)
            }
            console.log('Updating user redux')
            dispatchFalse(setUser(responseJson.data))
          } else {
            console.log('Error At Put User ')
            console.log(error)
            if (toast.show) {
              toast.show('Unable To Update User Data', {
                type: 'danger',
              })
            }
          }
        })
        .catch((error) => {
          //Hide Loader
          dispatchFalse(setLoading(false))
          console.log('Error At Put User Out')
          console.log(error)
          console.log(data)

          const err =
            error?.response?.data?.length < 100 && error?.response?.data
          if (
            err &&
            Object.keys(err).length > 0 &&
            Object.keys(err).length < 6
          ) {
            Object.entries(err).map(([k, v]) => {
              toast.show(`${k} : ${v}`, {
                type: 'danger',
              })
            })
          } else if (toast.show) {
            toast.show('Unable To Update User Data', {
              type: 'danger',
            })
          }
        })
    } else {
      dispatchFalse(setLoading(false))
      if (toast.show) {
        toast.show('Unauthorized', {
          type: 'danger',
        })
      }
    }
  })
}
