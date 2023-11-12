import { View, Text } from 'react-native'
import React from 'react'
import styles from './customDropDown.style'
import { Dropdown } from 'react-native-element-dropdown'

const CustomDropdown = ({
  label,
  options,
  placeholder,
  state,
  setState,
  labelField,
  valueField,
  setOtherState,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Dropdown
        style={styles.input}
        data={options || []}
        placeholder={placeholder}
        value={state}
        labelField={labelField}
        valueField={valueField}
        onChange={(item) => {
          if (setState) {
            setState(item[valueField])
          }
          if (setOtherState) {
            setOtherState(item)
          }
        }}
        renderItem={(item) => {
          labelField?.split('.')?.forEach((field) => {
            item = item[field]
          })

          return (
            <View style={styles.dropDownItemContainer}>
              <Text style={styles.dropDownText}>{item}</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

export default CustomDropdown
