export const login = () => {
  axios
    .post(API + '/login', {
      ...dataToSend,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //Hide Loader
      setLoading(false)
      console.log(responseJson)
      // If server response message same as Data Matched
      if (responseJson?.status === 'success') {
        AsyncStorage.setItem('user_id', responseJson?.data?.email)
        console.log(responseJson?.data?.email)
        navigation.replace('home/warehouses')
      } else {
        setErrortext(responseJson?.msg)
        console.log('Please check your email id or password')
      }
    })
    .catch((error) => {
      //Hide Loader
      setLoading(false)
      let msg = 'Network Error'
      if (error?.response?.data?.message) {
        msg = 'Email Not Registered'
      } else if (error?.response?.data?.error) {
        msg = 'Invalid Password'
      }
      toast.show(msg, {
        type: 'danger',
      })
      console.error(error)
    })
}

export const signUp = () => {}
