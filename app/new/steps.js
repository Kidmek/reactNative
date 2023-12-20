import React from 'react'
import Steps from '../../components/wizard/Steps/Steps'
import { useLocalSearchParams } from 'expo-router'

const steps = () => {
  const params = useLocalSearchParams()
  return <Steps params={params} />
}

export default steps
