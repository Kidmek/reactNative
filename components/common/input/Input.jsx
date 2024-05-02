import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'
import styles from './input.style'
import { FontAwesome5 } from '@expo/vector-icons'
import {
  DATE,
  DIMENSION,
  MULTI,
  NUMBER,
  PASSWORD,
} from '../../../constants/strings'
import { COLORS, FONT } from '../../../constants'

const Input = ({
  style,
  label,
  state,
  setState,
  placeholder,
  type,
  setWhichToShow,
  id,
  error,
  outOfFocus,
  labelState,
  setLabelState,
}) => {
  return type === DATE ? (
    <View style={{ ...styles.inputWrapper, position: 'relative' }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View>
        <TextInput
          style={styles.input(error)}
          value={state}
          editable={false}
          placeholder={placeholder}
          secureTextEntry={type == PASSWORD}
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
  ) : type === DIMENSION ? (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.dimensionsInput}>
        <TextInput
          inputMode={'numeric'}
          style={styles.input(error)}
          value={state?.length}
          placeholder='L'
          onChangeText={(e) => {
            setState({ ...state, length: e })
          }}
        />
        <TextInput
          inputMode={'numeric'}
          style={styles.input(error)}
          value={state?.width}
          placeholder='W'
          onChangeText={(e) => {
            setState({ ...state, width: e })
          }}
        />
        <TextInput
          inputMode={'numeric'}
          style={styles.input(error)}
          value={state?.height}
          placeholder='H'
          onChangeText={(e) => {
            setState({ ...state, height: e })
          }}
        />
      </View>
    </View>
  ) : (
    <View style={{ ...styles.inputWrapper, gap: 0, flex: 1 }}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      {setLabelState && (
        <TextInput
          placeholder={'Input Label'}
          value={labelState}
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: COLORS.gray2,
            fontFamily: FONT.bold,
          }}
          onChangeText={(e) => {
            setLabelState(e)
          }}
        />
      )}
      <TextInput
        placeholder={placeholder}
        onBlur={outOfFocus}
        inputMode={type === NUMBER ? 'numeric' : 'text'}
        style={{ ...styles.input(error, type === MULTI) }}
        value={state}
        numberOfLines={type === MULTI ? 4 : 1}
        multiline={type === MULTI}
        onChangeText={(e) => {
          setState(e)
        }}
      />
    </View>
  )
}

export default Input
