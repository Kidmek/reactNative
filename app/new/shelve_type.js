import { View, Text, ScrollView, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import { COLORS } from '../../constants'
import styles from './styles/warehouse.style'
import { MULTI, NUMBER } from '../../constants/strings'

const shelve_type = () => {
  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const [price, setPrice] = useState()
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shelve Type Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Shelve Type Name'} state={name} setState={setName} />
        <Input
          label={'Shelve Type Price /' + 'm\u00B2'}
          state={price}
          setState={setPrice}
          type={NUMBER}
        />
        <Input
          label={'Office Description'}
          state={desc}
          setState={setDesc}
          type={MULTI}
        />
      </View>
      <View style={styles.footer}>
        <Button
          title='Cancel'
          style={styles.btn}
          color={COLORS.gray}
          onPress={() => {}}
        />
        <Button
          title='Save'
          style={styles.btn}
          color={COLORS.primary}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  )
}

export default shelve_type
