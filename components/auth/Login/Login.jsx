import React, { useState, createRef, useEffect, useLayoutEffect } from 'react'
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { useToast } from 'react-native-toast-notifications'

import styles from '../auth.style'
import { API, emailRegEx } from '../../../constants/strings'
import axios from 'axios'
import { store } from '../../../store'
import { setLoading, setUser } from '../../../features/data/dataSlice'
import { useNavigation } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUser, isLoggedIn } from '../../../api/apiConfig'
import { Ionicons } from '@expo/vector-icons'
import FlashScreen from './FlashScreen'
import UpdateScreen from './UpdateScreen'
import { COLORS, SIZES } from '../../../constants'

const Login = ({ setIsLogin }) => {
  const dispatch = store.dispatch
  const navigation = useNavigation()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errortext, setErrortext] = useState('')
  const [updateLoading, setUpdateLoading] = useState(true)
  const [hasUpdate, setHasUpdate] = useState({
    status: false,
    force: true,
  })
  const emailInputRef = createRef()
  const passwordInputRef = createRef()
  const toast = useToast()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: hasUpdate.status && !updateLoading,
      headerTransparent: true,
      headerTitle: '',
      headerRight: () => {
        if (hasUpdate.force) {
          return <></>
        }
        return (
          <TouchableOpacity
            onPress={() => {
              if (handleClose) {
                handleClose()
              }
            }}
          >
            <Ionicons
              name='close-circle-outline'
              size={SIZES.xxLarge * 1.5}
              color={COLORS.black}
            />
          </TouchableOpacity>
        )
      },
    })
  }, [hasUpdate, updateLoading])

  useEffect(() => {
    setUpdateLoading(true)

    isLoggedIn().then((res) => {
      if (res) {
        getUser().then((user) => {
          dispatch(setUser(user))
        })
        checkUpdate(true)
      } else {
        setUpdateLoading(false)
      }
    })
  }, [])

  const checkUpdate = (loggedIn) => {
    setTimeout(() => {
      setHasUpdate({
        status: false,
        force: false,
      })
      if (loggedIn) {
        navigation.navigate('home')
      }
      setUpdateLoading(false)
    }, 1)
    return
    axios
      .post(API + '/check-update', {})
      .then((responseJson) => {
        if (responseJson?.data?.token) {
          navigation.navigate('home')
        } else {
          setErrortext('Network Error')
        }
      })
      .catch((error) => {
        console.log(error)
        let msg = 'Network Error'
        toast.show(msg, {
          type: 'danger',
        })
      })
  }

  const handleClose = () => {
    setHasUpdate({ ...hasUpdate, status: false })
  }

  const handleSubmitPress = () => {
    toast.hideAll()
    setErrortext('')
    if (!userEmail || !userEmail.match(emailRegEx)) {
      toast.show('Please Enter An Email', {
        type: 'danger',
      })
      emailInputRef.current && emailInputRef.current.focus()
      emailInputRef
      return
    }
    if (!userPassword) {
      toast.show('Please Enter A Password', {
        type: 'danger',
      })
      passwordInputRef.current && passwordInputRef.current.focus()

      return
    }
    dispatch(setLoading(true))
    let dataToSend = {
      email: userEmail,
      password: userPassword,
      remember: true,
    }

    axios
      .post(API + '/api-token-auth', {
        ...dataToSend,
      })
      .then((responseJson) => {
        //Hide Loader
        dispatch(setLoading(false))
        // If server response message same as Data Matched
        if (responseJson?.data?.token) {
          if (responseJson?.data?.user) {
            dispatch(setUser(responseJson?.data?.user))
            AsyncStorage.setItem(
              'user_id',
              JSON.stringify(responseJson?.data?.user)
            )
          }
          if (responseJson?.data?.token) {
            AsyncStorage.setItem('token', responseJson?.data?.token)
            navigation.navigate('home')
            toast.show('Successfully Logged In', {
              type: 'success',
            })
          }
        } else {
          setErrortext('Please check your email or password')
        }
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
        dispatch(setLoading(false))
        let msg = 'Network Error'
        if (error.response.status === 422) {
          msg = 'Invalid Credentials'
        }
        toast.show(msg, {
          type: 'danger',
        })
      })
  }

  //

  useEffect(() => {
    if (userEmail) {
      if (!userEmail.match(emailRegEx)) {
        setErrortext('Please Enter A Valid Email')
      } else {
        setErrortext()
      }
    } else {
      setErrortext()
    }
  }, [userEmail])

  return updateLoading ? (
    <FlashScreen />
  ) : hasUpdate.status ? (
    <UpdateScreen force={hasUpdate.force} handleClose={handleClose} />
  ) : (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <Text style={styles.welcomeTextStyle}>Welcome Back</Text>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../assets/images/logo.jpg')}
                style={styles.logoStyle}
              />
            </View>
            <View style={styles.loginSectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder='Enter Email'
                placeholderTextColor='#8b9cb5'
                autoCapitalize='none'
                keyboardType='email-address'
                returnKeyType='next'
                ref={emailInputRef}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid='#f000'
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.loginSectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder='Enter Password'
                placeholderTextColor='#8b9cb5'
                keyboardType='default'
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid='#f000'
                returnKeyType='done'
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>Login</Text>
            </TouchableOpacity>
            <View style={styles.bottomTextStyle}>
              <Text style={styles.registerTextStyle}>
                New Here ?{' '}
                <Text
                  style={[styles.registerTextStyle, styles.redirectTextStyle]}
                  onPress={() => setIsLogin(false)}
                >
                  Register
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
}
export default Login
