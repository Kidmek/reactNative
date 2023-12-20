import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { COLORS } from '../../constants'

import Input from '../../components/common/input/Input'
import Footer from '../../components/common/footer/Footer'
import { addProductType } from '../../api/product/product'
import { MULTI } from '../../constants/strings'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { useNavigation } from 'expo-router'

const product_type = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()
  const [name, setName] = useState()
  const [desc, setDesc] = useState()

  const onAdd = () => {
    addProductType(
      {
        product_type_name: name,
        product_type_meta: desc,
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
        <Text style={styles.headerTitle}>Product Type Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Product Type Name'} state={name} setState={setName} />
        <Input
          type={MULTI}
          label={'Product Type Description'}
          state={desc}
          setState={setDesc}
        />
      </View>
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default product_type
