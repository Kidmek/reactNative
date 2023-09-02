import React, { useState, createRef, useEffect } from 'react'
import axios from 'axios'
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useToast } from 'react-native-toast-notifications'

import styles from '../auth.style'

import Loader from '../../common/loader/Loader'
import { API, emailRegEx } from '../../../constants/strings'
import { store } from '../../../store'

const SignUp = (props) => {
  const dispatch = store.dispatch
  const [userFirstName, setUserFirstName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userPhoneNumber, setUserPhoneNumber] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userConfirmPassword, setUserConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errortext, setErrortext] = useState('')

  const firstNameInputRef = createRef()
  const emailInputRef = createRef()
  const lastNameInputRef = createRef()
  const phoneNumberInputRef = createRef()
  const passwordInputRef = createRef()
  const confirmPasswordInputRef = createRef()
  const toast = useToast()

  useEffect(() => {
    if (userPassword && userConfirmPassword) {
      if (userConfirmPassword != userPassword) {
        setErrortext("Password's Dont Match")
      } else {
        setErrortext()
      }
    } else {
      setErrortext()
    }
  }, [userConfirmPassword, userPassword])

  const handleSubmitButton = () => {
    setErrortext('')
    if (!userFirstName) {
      toast.show('Please Enter A First Name', {
        type: 'danger',
      })
      firstNameInputRef.current && firstNameInputRef.current.focus()
      return
    }
    if (!userLastName) {
      toast.show('Please Enter A Last Name', {
        type: 'danger',
      })
      lastNameInputRef.current && lastNameInputRef.current.focus()
      return
    }
    if (!userEmail || !userEmail.match(emailRegEx)) {
      toast.show('Please Enter An Email', {
        type: 'danger',
      })
      emailInputRef.current && emailInputRef.current.focus()
      return
    }
    if (!userPhoneNumber) {
      toast.show('Please Enter A Phone Number', {
        type: 'danger',
      })
      phoneNumberInputRef.current && phoneNumberInputRef.current.focus()
      return
    }
    if (!userPassword) {
      toast.show('Please Enter A Password', {
        type: 'danger',
      })
      passwordInputRef.current && passwordInputRef.current.focus()
      return
    }
    if (!userConfirmPassword) {
      toast.show('Please Enter Password Confirmation', {
        type: 'danger',
      })
      confirmPasswordInputRef.current && confirmPasswordInputRef.current.focus()
      return
    }
    if (userPassword !== userConfirmPassword) {
      toast.show("Passwords Don't match", {
        type: 'danger',
      })
      confirmPasswordInputRef.current && confirmPasswordInputRef.current.focus()
      return
    }
    //Show Loader
    dispatch(setLoading(true))
    var dataToSend = {
      first_name: userFirstName,
      email: userEmail,
      last_name: userLastName,
      phone: userPhoneNumber,
      password: userPassword,
      password_confirmation: userConfirmPassword,
    }

    axios
      .post(API + '/register', {
        ...dataToSend,
      })
      .then((responseJson) => {
        //Hide Loader
        dispatch(setLoading(false))
        console.log(responseJson)
        // If server response message same as Data Matched
        if (responseJson?.data?.token) {
          props.setIsLogin(true)
          toast.show('Successfully Registered', {
            type: 'success',
          })
        } else {
          setErrortext(responseJson.msg)
        }
      })
      .catch((error) => {
        //Hide Loader
        dispatch(setLoading(false))

        toast.show(error.message, {
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
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/logo.jpg')}
            style={[
              styles.logoStyle,
              {
                height: 100,
              },
            ]}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.signUpSectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserFirstName(UserName)}
              underlineColorAndroid='#f000'
              placeholder='Enter First Name'
              placeholderTextColor='#8b9cb5'
              autoCapitalize='words'
              returnKeyType='next'
              ref={firstNameInputRef}
              onSubmitEditing={() =>
                lastNameInputRef.current && lastNameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.signUpSectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserLastName) => setUserLastName(UserLastName)}
              underlineColorAndroid='#f000'
              placeholder='Enter Last Name'
              placeholderTextColor='#8b9cb5'
              autoCapitalize='words'
              ref={lastNameInputRef}
              returnKeyType='next'
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.signUpSectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid='#f000'
              placeholder='Enter Email'
              placeholderTextColor='#8b9cb5'
              keyboardType='email-address'
              ref={emailInputRef}
              returnKeyType='next'
              onSubmitEditing={() =>
                phoneNumberInputRef.current &&
                phoneNumberInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.signUpSectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPhoneNumber) =>
                setUserPhoneNumber(UserPhoneNumber)
              }
              underlineColorAndroid='#f000'
              placeholder='Enter Phone Number'
              placeholderTextColor='#8b9cb5'
              autoCapitalize='sentences'
              keyboardType='phone-pad'
              ref={phoneNumberInputRef}
              returnKeyType='next'
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.signUpSectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid='#f000'
              placeholder='Enter Password'
              placeholderTextColor='#8b9cb5'
              ref={passwordInputRef}
              returnKeyType='next'
              secureTextEntry={true}
              onSubmitEditing={() =>
                confirmPasswordInputRef.current &&
                confirmPasswordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.signUpSectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserConfirmPassword(UserPassword)
              }
              underlineColorAndroid='#f000'
              placeholder='Confirm Password'
              placeholderTextColor='#8b9cb5'
              ref={confirmPasswordInputRef}
              returnKeyType='done'
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>Register</Text>
          </TouchableOpacity>
          <View style={styles.bottomTextStyle}>
            <Text style={styles.registerTextStyle}>
              Already Have An Account ?{' '}
              <Text
                style={[styles.registerTextStyle, styles.redirectTextStyle]}
                onPress={() => props.setIsLogin(true)}
              >
                Login
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}
export default SignUp
