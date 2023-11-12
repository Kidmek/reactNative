import { View, Text, Button } from 'react-native'
import React from 'react'
import * as DocumentPickerApi from 'expo-document-picker'
import styles from './input.style'

const DocumentPicker = ({ title, setState, name }) => {
  const pickDocument = async () => {
    let result = await DocumentPickerApi.getDocumentAsync({})
    if (result.assets?.length) {
      setState(result.assets[0])
    }
  }
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{title}</Text>
      {name && <Text style={styles.fileName}>{name}</Text>}
      <Button title='Select Document' onPress={pickDocument} />
    </View>
  )
}

export default DocumentPicker
