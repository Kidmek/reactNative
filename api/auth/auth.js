import axios from 'axios'
import { API } from '../../constants/strings'

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
