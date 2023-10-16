import { View, Text } from 'react-native'
import React from 'react'
import styles from './detail.style'

const Detail = ({ label, value }) => {
  return (
    <View style={styles.detailWrapper}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  )
}

export default Detail
