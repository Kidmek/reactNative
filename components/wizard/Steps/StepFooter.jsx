import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './steps.style'
import { AntDesign } from '@expo/vector-icons'
import { COLORS } from '../../../constants'

const StepFooter = ({ setCurrent, current, length, onFinish }) => {
  const iconSize = 20
  const previous = () => {
    setCurrent(current <= 1 ? current : current - 1)
  }
  const next = () => {
    setCurrent(current >= length ? current : current + 1)
  }
  return (
    <View style={styles.footerContainer}>
      {current !== 1 && (
        <TouchableOpacity onPress={previous} style={styles.footerItems}>
          <AntDesign name='arrowleft' size={iconSize} color={COLORS.primary} />
          <Text style={styles.buttonTitle}>Previous</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={current === length ? onFinish : next}
        style={{ ...styles.footerItems, justifyContent: 'flex-end' }}
      >
        <Text style={styles.buttonTitle}>
          {current === length ? 'Finish' : 'Next'}
        </Text>
        <AntDesign
          name={current === length ? 'check' : 'arrowright'}
          size={iconSize}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  )
}

export default StepFooter
