import React from 'react'
import SinglePayment from '../../components/payment/Single/SinglePayment'
import { useLocalSearchParams } from 'expo-router'

const payment = () => {
  const params = useLocalSearchParams()
  return <SinglePayment params={params} />
}

export default payment
