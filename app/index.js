import { useState } from 'react'

import { COLORS } from '../constants'
import Login from '../components/auth/Login/Login'
import SignUp from '../components/auth/Signup/Signup'
import { SafeAreaView } from 'react-native-safe-area-context'
import OTP from '../components/auth/OTP/OTP'

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [otp, setOtp] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {otp ? (
        <OTP setOtp={setOtp} setIsLogin={setIsLogin} />
      ) : isLogin ? (
        <Login setIsLogin={setIsLogin} setOtp={setOtp} />
      ) : (
        <SignUp setIsLogin={setIsLogin} setOtp={setOtp} />
      )}
    </SafeAreaView>
  )
}

export default Authentication
