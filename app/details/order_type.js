import React from 'react'
import OrderTypes from '../../components/orders/orderTypes/OrderTypes'
import { useLocalSearchParams } from 'expo-router'

function order_type() {
  const params = useLocalSearchParams()
  return <OrderTypes params={params} />
}

export default order_type
