import { View, Text, Button } from 'react-native'
import React from 'react'
import styles from './footer.style'
import { COLORS } from '../../../constants'

const Footer = ({ onCancel, onSave }) => {
  return (
    <View style={styles.footer}>
      <Button
        title='Cancel'
        style={styles.btn}
        color={COLORS.gray}
        onPress={onCancel}
      />
      <Button
        title='Save'
        style={styles.btn}
        color={COLORS.primary}
        onPress={onSave}
      />
    </View>
  )
}

export default Footer
