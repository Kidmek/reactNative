import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { COLORS } from '../../constants'

import Input from '../../components/common/input/Input'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'

const product_category = () => {
  const [name, setName] = useState()
  const [description, setDescription] = useState()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Type Information</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Category Name'} state={name} setState={setName} />
        <Input
          type={MULTI}
          label={'Category Description'}
          state={description}
          setState={setDescription}
        />
      </View>
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default product_category
