import { View, Text } from 'react-native'
import React from 'react'
import NewWarehouse from '../../components/home/warehouse/NewWarehouse'
import { useLocalSearchParams } from 'expo-router'

const warehouse = () => {
  const params = useLocalSearchParams()
  return <NewWarehouse params={params} />
}

export default warehouse
