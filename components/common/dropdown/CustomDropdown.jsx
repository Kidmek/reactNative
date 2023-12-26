import { View, Text } from 'react-native'
import React from 'react'
import styles from './customDropDown.style'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import { COLORS } from '../../../constants'

const CustomDropdown = ({
  label,
  options,
  placeholder,
  state,
  setState,
  labelField,
  valueField,
  setOtherState,
  isMulti,
  signup,
}) => {
  return (
    <View style={styles.inputWrapper}>
      {!signup && <Text style={styles.inputLabel}>{label}</Text>}
      {isMulti ? (
        <MultiSelect
          selectedTextStyle={{ color: COLORS.primary }}
          activeColor={COLORS.gray2}
          style={styles.input}
          data={options || []}
          placeholder={placeholder}
          value={state}
          labelField={labelField}
          valueField={valueField}
          onChange={(item) => {
            if (setState) {
              setState(item)
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
              <View style={styles.dropDownItemContainer} key={item?.id}>
                <Text style={styles.dropDownText}>{item}</Text>
              </View>
            )
          }}
        />
      ) : (
        <Dropdown
          style={
            !signup
              ? { ...styles.input }
              : {
                  flex: 1,
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 30,
                  borderColor: COLORS.gray2,
                }
          }
          data={options || []}
          placeholder={placeholder}
          placeholderStyle={
            signup
              ? {
                  color: '#8b9cb5',
                }
              : {}
          }
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
      )}
    </View>
  )
}

export default CustomDropdown
