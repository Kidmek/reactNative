import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import SingleTransit from '../../components/transits/welcome/SingleTransit'

const transit = () => {
  const params = useLocalSearchParams()
  return <SingleTransit params={params} />
}

export default transit
