import { View, Text, ScrollView, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import { COLORS } from '../../constants'
import styles from './styles/warehouse.style'
import { MULTI, NUMBER, mSQUARE } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'

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
          label={'Shelve Type Price /' + mSQUARE}
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
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default shelve_type
