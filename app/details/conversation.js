import { View, Text } from 'react-native'
import React from 'react'
import Conversation from '../../components/message/Conversation'
import { useLocalSearchParams } from 'expo-router'

const conversation = () => {
  const params = useLocalSearchParams()
  return <Conversation params={params} />
}

export default conversation
