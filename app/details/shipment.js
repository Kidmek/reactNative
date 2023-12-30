import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import SingleShipment from '../../components/shipments/New/SingleShipment'

const shipment = () => {
  const params = useLocalSearchParams()
  return <SingleShipment params={params} />
}

export default shipment
