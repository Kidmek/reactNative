import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'

import Input from '../../components/common/input/Input'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'

const order_type = () => {
  const [name, setName] = useState()
  const [description, setDescription] = useState()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Type Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Order Type Name'} state={name} setState={setName} />
        <Input
          type={MULTI}
          label={'Order Type Description'}
          state={description}
          setState={setDescription}
        />
      </View>
      <Footer onSave={() => {}} />
    </ScrollView>
  )
}

export default order_type
