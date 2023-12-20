import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import styles from './footer.style'
import { COLORS } from '../../../constants'
import { useNavigation } from 'expo-router/src/useNavigation'

const Footer = ({ onCancel, onSave }) => {
  const navigate = useNavigation()
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={{ ...styles.btn, backgroundColor: COLORS.gray2 }}
        onPress={() => {
          onCancel ? onCancel() : navigate.goBack()
        }}
      >
        <Text style={{ ...styles.text }}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title='Save'
        style={{ ...styles.btn, backgroundColor: COLORS.primary }}
        onPress={onSave}
      >
        <Text style={{ ...styles.text }}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer
