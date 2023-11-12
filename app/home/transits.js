import { View, Text } from 'react-native'
import React from 'react'
import TransitWelcome from '../../components/transits/welcome/TransitWelcome'
import { SafeAreaView } from 'react-native-safe-area-context'

const transits = () => {
  return (
    <SafeAreaView>
      <TransitWelcome />
    </SafeAreaView>
  )
}

export default transits
