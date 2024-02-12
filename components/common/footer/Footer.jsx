import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import styles from './footer.style'
import { COLORS } from '../../../constants'
import { useNavigation } from 'expo-router/src/useNavigation'

const Footer = ({
  onCancel,
  onSave,
  saveText,
  cancelText,
  onlyCancel,
  onlySave,
}) => {
  const navigate = useNavigation()
  return (
    <View style={styles.footer}>
      {!onlySave && (
        <TouchableOpacity
          style={{ ...styles.btn, backgroundColor: COLORS.gray2 }}
          onPress={() => {
            onCancel ? onCancel() : navigate.goBack()
          }}
        >
          <Text style={{ ...styles.text }}>{cancelText ?? 'Cancel'}</Text>
        </TouchableOpacity>
      )}
      {!onlyCancel && (
        <TouchableOpacity
          title='Save'
          style={{
            ...styles.btn,
            backgroundColor: COLORS.primary,
          }}
          onPress={onSave}
        >
          <Text style={{ ...styles.text, color: COLORS.pureWhite }}>
            {saveText ?? 'Save'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Footer
