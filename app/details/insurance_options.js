import React from 'react'
import OrderTypes from '../../components/orders/orderTypes/OrderTypes'
import { useLocalSearchParams } from 'expo-router'
import InsuranceOptions from '../../components/insurances/insuranceOptions/InsuranceOptions'

function insurance_options() {
  const params = useLocalSearchParams()
  return <InsuranceOptions params={params} />
}

export default insurance_options
