import React from 'react'
import SingleWarehouse from '../../components/home/warehouse/SingleWarehouse'
import { useLocalSearchParams } from 'expo-router'

const warehouse = () => {
  const params = useLocalSearchParams()
  return <SingleWarehouse params={params} />
}

export default warehouse
