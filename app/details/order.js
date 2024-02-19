import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import SingleOrder from '../../components/orders/Single/SingleOrder'

const order = () => {
  const params = useLocalSearchParams()
  return <SingleOrder params={params} />
}

export default order
