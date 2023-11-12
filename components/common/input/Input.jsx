import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './input.style'
import { FontAwesome5 } from '@expo/vector-icons'
import { DATE, MULTI, NUMBER } from '../../../constants/strings'
import { COLORS } from '../../../constants'

const Input = ({
  label,
  state,
  setState,
  placeholder,
  type,
  setWhichToShow,
  id,
}) => {
  return type === DATE ? (
    <View style={{ ...styles.inputWrapper, position: 'relative' }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View>
        <TextInput
          style={styles.input}
          value={state}
          editable={false}
          placeholder={placeholder}
        />
        <TouchableOpacity
          style={styles.dateIcon}
          onPress={() => {
            setWhichToShow(id)
          }}
        >
          <FontAwesome5 name='calendar-alt' size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        inputMode={type === NUMBER ? 'numeric' : 'text'}
        style={styles.input}
        value={state}
        numberOfLines={type === MULTI ? 3 : 1}
        multiline={type === MULTI}
        onChangeText={(e) => {
          setState(e)
        }}
      />
    </View>
  )
}

export default Input
