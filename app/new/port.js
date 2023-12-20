import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'

import Input from '../../components/common/input/Input'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { useNavigation } from 'expo-router'
import { addPort } from '../../api/shipment/shipment'

const port = () => {
  const [name, setName] = useState()
  const [country, setCountry] = useState()
  const [city, setCity] = useState()
  const [description, setDescription] = useState()
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()

  const onAdd = () => {
    addPort(
      {
        city,
        discription: description,
        country,
        name,
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Port Information</Text>
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
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default port
