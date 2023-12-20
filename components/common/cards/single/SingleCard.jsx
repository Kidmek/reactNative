import { TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './singleCard.style'
import { useNavigation } from 'expo-router'
import { SIZES } from '../../../../constants'

const SingleCard = ({ children, page, isOnlyText, onClick, navigate }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={
        isOnlyText
          ? { ...styles.onlyTextContainer, paddingVertical: SIZES.large }
          : styles.warehouseContainer
      }
      onPress={() => {
        if (onClick && !navigate) {
          onClick()
        } else if (page && page.name) {
          navigation.navigate(page?.name, {
            screen: page?.screen,
            params: page?.params,
          })
        }
      }}
    >
      {children}
    </TouchableOpacity>
  )
}

export default SingleCard
