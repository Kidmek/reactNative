import React from 'react'
import { View, Text } from 'react-native'
import styles from './steps.style'

const Circle = ({ index, selectedIndex }) => {
  return (
    <View
      style={
        index > selectedIndex
          ? { ...styles['circle'], backgroundColor: '#fff' }
          : { ...styles['circle'], backgroundColor: '#2E81D3' }
      }
    >
      <Text
        style={
          index > selectedIndex
            ? styles['selectedcircleTitle']
            : styles['circleTitle']
        }
      >
        {index}
      </Text>
    </View>
  )
}

const StepHeader = ({ current, length }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length }, (_, i) => i + 1).map((step) => (
        <View key={step} style={styles.stepContainer}>
          <Circle selectedIndex={current} index={step} />
        </View>
      ))}
      <View style={styles.line} />
    </View>
  )
}

export default StepHeader
