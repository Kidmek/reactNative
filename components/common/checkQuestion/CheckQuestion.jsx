import { View, Text, Switch } from 'react-native'
import React from 'react'
import styles from '../styles/warehouse.style'
import newOrderStyles from '../styles/order.style'
import { COLORS, SIZES } from '../../../constants'
import Checkbox from 'expo-checkbox'

const CheckQuestion = ({ title, state, setState }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ ...styles.inputLabel, flex: 1 }}>{title}</Text>

      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={state ? COLORS.blue : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={() => {
          setState(!state)
        }}
        value={state}
      />
    </View>
  )

  return (
    <View>
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
