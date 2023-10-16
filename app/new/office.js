import { View, Text, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import { COLORS } from '../../constants'
import styles from './styles/warehouse.style'
import { NUMBER } from '../../constants/strings'

const office = () => {
  const [name, setName] = useState()
  const [space, setSpace] = useState()
  const [price, setPrice] = useState()
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Office Information</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Office Name'} state={name} setState={setName} />
        <Input label={'Office Space'} state={space} setState={setSpace} />
        <Input
          label={'Office Price'}
          state={price}
          setState={setPrice}
          type={NUMBER}
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

export default office
