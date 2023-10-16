import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ShipmentWelcome from '../../../components/shipments/welcome/ShipmentWelcome'

const shipment = () => {
  return (
    <SafeAreaView>
      <ShipmentWelcome />
    </SafeAreaView>
  )
}

export default shipment
