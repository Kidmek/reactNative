import React from 'react'

import { useLocalSearchParams } from 'expo-router'
import SingleGroup from '../../components/staffs/SingleGroup/SingleGroup'

function group() {
  const params = useLocalSearchParams()
  return <SingleGroup id={params?.id} name={params?.name} />
}

export default group
