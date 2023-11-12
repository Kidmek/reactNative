import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'

import Input from '../../components/common/input/Input'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'

const port = () => {
  const [name, setName] = useState()
  const [country, setCountry] = useState()
  const [city, setCity] = useState()
  const [description, setDescription] = useState()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Port Information</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Country'} state={country} setState={setCountry} />
        <Input label={'City'} state={city} setState={setCity} />
        <Input label={'Name'} state={name} setState={setName} />
        <Input
          type={MULTI}
          label={' Description'}
          state={description}
          setState={setDescription}
        />
      </View>
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default port
