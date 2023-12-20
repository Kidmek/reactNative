import { View, Text } from 'react-native'
import React from 'react'
import styles from './detail.style'
import { mSQUARE } from '../../../constants/strings'

const CardDetail = ({ label, value, isPrice, isSpace, isDate }) => {
  return (
    <View style={styles.cardDetailWrapper}>
      <Text style={styles.cardDetailLabel}>{label}</Text>
      <Text style={styles.cardDetailValue}>
        {isDate ? Date(value) : value}
        {isPrice && value ? ' Birr' : isSpace ? ' ' + mSQUARE : ''}
      </Text>
    </View>
  )
}

export default CardDetail
