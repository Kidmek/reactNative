import React from 'react'
import SingleProduct from '../../components/products/Single/SingleProduct'
import { useLocalSearchParams } from 'expo-router/src/hooks'

const product = () => {
  const params = useLocalSearchParams()
  return <SingleProduct params={params} />
}

export default product
