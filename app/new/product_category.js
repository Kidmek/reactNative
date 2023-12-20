import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { COLORS } from '../../constants'

import Input from '../../components/common/input/Input'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { useNavigation } from 'expo-router'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../store'
import { addProductCategory } from '../../api/product/product'

const product_category = () => {
  const [name, setName] = useState()
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()

  const [description, setDescription] = useState()

  const onAdd = () => {
    addProductCategory(
      {
        category_name: name,
        category_meta: description,
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
        {/* */}
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
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default product_category
