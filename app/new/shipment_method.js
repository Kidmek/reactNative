import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import styles from './styles/warehouse.style'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { useToast } from 'react-native-toast-notifications'
import { useNavigation } from 'expo-router'
import { store } from '../../store'
import { addShipmentMethod } from '../../api/shipment/shipment'

const shipment_method = () => {
  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const toast = useToast()
  const navigate = useNavigation()
  const dispatch = store.dispatch
  const onAdd = () => {
    addShipmentMethod(
      {
        name,
        description: desc,
      },
      dispatch,
      toast,
      () => navigate.goBack()
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Transportation Method Information
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Name'} state={name} setState={setName} />
        <Input
          label={'Transportation Description'}
          state={desc}
          type={MULTI}
          setState={setDesc}
        />
      </View>
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default shipment_method
