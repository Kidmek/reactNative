import { View, Text } from 'react-native'
import React from 'react'
import styles from './detail.style'
import { mSQUARE } from '../../../constants/strings'

const Detail = ({ label, value, isPrice, isSpace }) => {
  return (
    <View style={styles.detailWrapper}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>
        {value}
        {isPrice ? ' Birr' : isSpace ? ' ' + mSQUARE : ''}{' '}
      </Text>
    </View>
  )
}

export default Detail
