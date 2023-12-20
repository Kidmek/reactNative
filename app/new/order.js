import React from 'react'
import NewOrder from '../../components/orders/New/NewOrder'
import { useLocalSearchParams } from 'expo-router'

const order = () => {
  const params = useLocalSearchParams()

  return (
    <>
      <NewOrder params={params} />
    </>
  )
}

export default order
