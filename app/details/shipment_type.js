import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ShipmentType from '../../components/shipments/type/ShipmentType'

function shipment_type() {
  const params = useLocalSearchParams()
  return <ShipmentType params={params} />
}

export default shipment_type
