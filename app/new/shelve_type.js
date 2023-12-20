import { View, Text, ScrollView, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import { COLORS } from '../../constants'
import styles from './styles/warehouse.style'
import { MULTI, NUMBER, mSQUARE } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../store'
import { addShelveType } from '../../api/storage/storage'
import { useNavigation } from 'expo-router/src/useNavigation'

const shelve_type = () => {
  const initState = {
    name: '',
  }
  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const [price, setPrice] = useState()

  const [errors, setErrors] = useState({
    name: false,
    desc: false,
    price: false,
  })

  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()

  const onAdd = () => {
    if (!name) {
      setErrors({ ...errors, name: true })
      toast.show('Name Required', { type: 'danger' })
      return
    }
    if (!price) {
      setErrors({ ...errors, price: true })
      toast.show('Price Required', { type: 'danger' })
      return
    }
    if (!desc) {
      setErrors({ ...errors, desc: true })
      toast.show('Description Required', { type: 'danger' })
      return
    }
    setErrors({ name: false, desc: false, price: false })
    addShelveType({ name, description: desc, price }, dispatch, toast, () => {
      navigate.goBack()
    })
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shelve Type Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          label={'Name'}
          state={name}
          setState={setName}
          error={errors.name}
        />
        <Input
          label={'Price'}
          state={price}
          setState={setPrice}
          type={NUMBER}
          error={errors.price}
        />
        <Input
          label={'Description'}
          state={desc}
          setState={setDesc}
          type={MULTI}
          error={errors.desc}
        />
      </View>
      <Footer
        onCancel={() => {
          navigate.goBack()
        }}
        onSave={onAdd}
      />
    </ScrollView>
  )
}

export default shelve_type
