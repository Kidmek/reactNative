import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './input.style'
import { MULTI, NUMBER } from '../../../constants/strings'

const Input = ({ label, state, setState, type }) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        inputMode={type === NUMBER ? 'numeric' : 'text'}
        style={styles.input}
        value={state}
        multiline={type === MULTI}
        onChangeText={(e) => {
          setState(e)
        }}
      />
    </View>
  )
}

export default Input
