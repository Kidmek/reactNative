import { View, Text } from 'react-native'
import React from 'react'
import styles from './screenheader.style'

const Header = ({ name, text }) => {
  return (
    <View>
      <Text style={styles.userName}>Hello {name}</Text>
      <Text style={styles.welcomeMessage}>Find Your {text}</Text>
    </View>
  )
}

export default Header
