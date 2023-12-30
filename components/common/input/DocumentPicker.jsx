import { View, Text, Button, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import * as DocumentPickerApi from 'expo-document-picker'
import styles from './input.style'
import { COLORS, FONT, SIZES } from '../../../constants'

const DocumentPicker = ({ title, setState, name, multi }) => {
  const pickDocument = async () => {
    let result = await DocumentPickerApi.getDocumentAsync({
      multiple: true,
    })
    if (result.assets?.length) {
      if (multi) {
        setState(result.assets)
      } else {
        setState(result.assets[0])
      }
    }
  }
  return (
    <View style={{ ...styles.inputWrapper, marginBottom: SIZES.medium }}>
      <Text style={styles.inputLabel}>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: SIZES.xSmall,
          alignItems: 'center',
        }}
      >
        <Pressable
          onPress={pickDocument}
          style={{
            height: '100%',
            backgroundColor: COLORS.primary,
            paddingVertical: SIZES.small,
            paddingHorizontal: SIZES.medium,
            borderBottomLeftRadius: SIZES.xSmall,
            borderTopLeftRadius: SIZES.xSmall,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: FONT.regular,
              textAlignVertical: 'center',
              flex: 1,
            }}
          >
            Select Files
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: FONT.regular,
              marginHorizontal: SIZES.small,
            }}
          >
            {name ?? 'No File Selected'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default DocumentPicker
