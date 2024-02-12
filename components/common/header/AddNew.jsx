import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import styles from './screenheader.style'

const AddNew = ({ title, page, onPress }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress()
        } else {
          navigation.navigate(page?.name, {
            screen: page?.screen,
            params: page?.params,
          })
        }
      }}
      style={styles.headerBtn}
    >
      <AntDesign name='plus' size={20} color={'white'} />
      <Text style={styles.headerTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AddNew
