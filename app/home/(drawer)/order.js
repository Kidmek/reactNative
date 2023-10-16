import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderWelcome from '../../../components/orders/welcome/OrderWelcome'

const order = () => {
  return (
    <SafeAreaView>
      <OrderWelcome />
    </SafeAreaView>
  )
}

export default order
