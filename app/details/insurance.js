import React from 'react'
import SingleInsurance from '../../components/insurances/welcome/SingleInsurance'
import { useLocalSearchParams } from 'expo-router'

const insruance = () => {
  const params = useLocalSearchParams()
  return <SingleInsurance params={params} />
}

export default insruance
