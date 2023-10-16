import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { COLORS } from '../../constants'

import Input from '../../components/common/input/Input'

const product_type = () => {
  const [name, setName] = useState()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Type Information</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Product Type Name'} state={name} setState={setName} />
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

export default product_type
