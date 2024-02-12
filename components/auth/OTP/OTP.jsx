import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../auth.style'
import { SIZES } from '../../../constants'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useToast } from 'react-native-toast-notifications'

const OTP = ({ setIsLogin, setOtp }) => {
  const WAIT_TIME = {
    second: 9,
    minute: 0,
  }
  const CELL_COUNT = 6
  const toast = useToast()
  const [errortext, setErrortext] = useState()
  const [code, setCode] = useState()
  const [timer, setTimer] = useState(WAIT_TIME)
  const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      let second = timer.second
      let minute = timer.minute
      if (second > 0) {
        second--
      }

      if (second === 0) {
        if (minute === 0) {
          clearInterval(interval)
        } else {
          second = 59
          minute--
        }
      }
      setTimer({
        second,
        minute,
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timer.second])

  const handleSubmitButton = () => {
    if (code && code.length == CELL_COUNT) {
      setIsLogin(true)
      setOtp(false)
    } else {
      toast.show('Please Fill Out The Slots', {
        type: 'danger',
      })
    }
  }
  const resend = () => {
    setTimer(WAIT_TIME)
  }
  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../assets/images/logo.jpg')}
                style={styles.logoStyle}
              />
            </View>
            <Text
              style={{
                ...styles.welcomeTextStyle,
                fontSize: SIZES.xLarge,
                marginBottom: SIZES.large,
              }}
            >
              Enter Verification Code
            </Text>
            <CodeField
              ref={ref}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType='number-pad'
              textContentType='oneTimeCode'
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <View style={styles.bottomTextStyle}>
              <Text style={styles.registerTextStyle}>
                Didn't Get The Code ?{' '}
                {timer.second > 0 || timer.minute > 0 ? (
                  <Text
                    style={[
                      styles.registerTextStyle,
                      styles.redirectTextStyle,
                      { textDecorationLine: 'none' },
                    ]}
                  >
                    Wait For{' '}
                    {timer.minute < 10 ? `0${timer.minute}` : timer.minute}:
                    {timer.second < 10 ? `0${timer.second}` : timer.second}
                  </Text>
                ) : (
                  <Text
                    style={[styles.registerTextStyle, styles.redirectTextStyle]}
                    onPress={resend}
                  >
                    Resend
                  </Text>
                )}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}
            >
              <Text style={styles.buttonTextStyle}>Verify</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
}

export default OTP
