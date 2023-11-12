import { TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './singleCard.style'
import { useNavigation } from 'expo-router'

const SingleCard = ({ children, page }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.warehouseContainer}
      onPress={() => {
        navigation.navigate(page?.name, {
          screen: page?.screen,
          params: page?.params,
        })
      }}
    >
      {children}
    </TouchableOpacity>
  )
}

export default SingleCard
