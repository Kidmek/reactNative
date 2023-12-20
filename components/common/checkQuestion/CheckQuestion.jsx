import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/warehouse.style'
import newOrderStyles from '../styles/order.style'
import { COLORS, SIZES } from '../../../constants'
import Checkbox from 'expo-checkbox'

const CheckQuestion = ({ title, state, setState, wizard }) => {
  return (
    <View style={{ paddingHorizontal: wizard ? SIZES.medium : '' }}>
      <Text style={{ ...styles.inputLabel, textAlign: 'center' }}>{title}</Text>
      <View
        style={{
          ...newOrderStyles.singleInfoContainer,
          justifyContent: 'space-around',
          marginVertical: SIZES.small,
        }}
      >
        <View>
          <Checkbox
            value={state}
            color={COLORS.primary}
            onValueChange={(value) => {
              setState(true)
            }}
          />
          <Text>Yes</Text>
        </View>
        <View>
          <Checkbox
            value={!state}
            color={COLORS.primary}
            onValueChange={(value) => {
              setState(false)
            }}
          />
          <Text>No</Text>
        </View>
      </View>
    </View>
  )
}

export default CheckQuestion
