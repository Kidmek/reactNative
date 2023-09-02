import React, { useState, createRef, useEffect } from 'react'
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

import AsyncStorage from '@react-native-community/async-storage'
import Loader from '../../common/loader/Loader'
import styles from '../auth.style'
import { API, emailRegEx } from '../../../constants/strings'
import axios from 'axios'
import { store } from '../../../store'
import { setLoading } from '../../../features/data/dataSlice'
import { useNavigation } from 'expo-router'

const Login = ({ setIsLogin }) => {
  const dispatch = store.dispatch
  const navigation = useNavigation()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errortext, setErrortext] = useState('')

  const emailInputRef = createRef()
  const passwordInputRef = createRef()
  const toast = useToast()

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
      .post(API + '/login', {
        ...dataToSend,
      })
      .then((responseJson) => {
        //Hide Loader
        dispatch(setLoading(false))
        console.log(responseJson)
        // If server response message same as Data Matched
        if (responseJson?.data?.token) {
          toast.show('Successfully Logged In', {
            type: 'success',
          })
          AsyncStorage.setItem('user_id', responseJson?.data?.email)
          AsyncStorage.setItem('token', responseJson?.data?.token)
          // console.log(responseJson?.data?.email)
          // navigation.replace('home/warehouses')
        } else {
          setErrortext(responseJson?.msg)
          console.log('Please check your email id or password')
        }
      })
      .catch((error) => {
        //Hide Loader
        dispatch(setLoading(false))
        let msg = 'Network Error'
        if (error?.response?.data?.message) {
          msg = 'Email Not Registered'
        } else if (error?.response?.data?.error) {
          msg = 'Invalid Password'
        }
        toast.show(msg, {
          type: 'danger',
        })
        console.log(error)
      })
  }

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

  return (
    <View style={styles.mainBody}>
      <Loader />
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
