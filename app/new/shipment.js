import React from 'react'
import NewShipment from '../../components/shipments/New/NewShipment'
import { useLocalSearchParams } from 'expo-router'

const shipment = () => {
  const params = useLocalSearchParams()

  return <NewShipment params={params} />
}

export default shipment
