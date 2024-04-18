import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { WebView } from 'react-native-webview'

const chapa = () => {
  const params = useLocalSearchParams()
  console.log(params.url)
  return (
    <WebView
      style={{
        flex: 1,
      }}
      source={{ uri: params.url }}
    />
  )
}

export default chapa
