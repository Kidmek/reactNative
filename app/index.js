import { useState } from 'react'
import { SafeAreaView } from 'react-native'

import { COLORS } from '../constants'
import Login from '../components/auth/Login/Login'
import SignUp from '../components/auth/Signup/Signup'

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </SafeAreaView>
  )
}

export default Authentication
