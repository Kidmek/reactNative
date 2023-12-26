import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import SingleWizardOrder from '../../components/wizard/Single/SingleWizardOrder'

const wizard = () => {
  const params = useLocalSearchParams()
  return <SingleWizardOrder params={params} />
}

export default wizard
