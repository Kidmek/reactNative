import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PortWelcome from '../../components/ports/welcome/PortWelcome'

const ports = () => {
  return (
    <SafeAreaView>
      <PortWelcome />
    </SafeAreaView>
  )
}

export default ports
