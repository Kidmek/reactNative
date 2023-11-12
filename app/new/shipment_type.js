import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import styles from './styles/warehouse.style'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'

const shipment_type = () => {
  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shipment Type Information</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Name'} state={name} setState={setName} />
        <Input
          label={'Description'}
          state={desc}
          type={MULTI}
          setState={setDesc}
        />
      </View>
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default shipment_type
