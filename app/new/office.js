import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../components/common/input/Input'
import { COLORS } from '../../constants'
import styles from './styles/warehouse.style'
import { NUMBER } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { addOffice, getOfficeEquipments } from '../../api/office/office'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import { useNavigation } from 'expo-router'

const office = () => {
  const [name, setName] = useState()
  const [space, setSpace] = useState()
  const [price, setPrice] = useState()
  const [equipments, setEquipments] = useState()
  const [selectedEquipments, setSelectedEquipments] = useState([])
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()
  const fetching = useSelector(selectIsFetching)
  const [errors, setErrors] = useState({
    name: false,
    space: false,
    price: false,
    equipment: false,
  })

  useEffect(() => {
    getOfficeEquipments(null, dispatch, setEquipments, toast)
  }, [])
  const onAdd = () => {
    addOffice(
      {
        name,
        space,
        price,
        equipment: selectedEquipments,
      },
      dispatch,
      toast,
      () => navigate.goBack()
    )
  }
  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Office Information</Text>
        {/* */}
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Office Name'} state={name} setState={setName} />
        <Input
          label={'Office Space'}
          state={space}
          setState={setSpace}
          type={NUMBER}
        />
        <Input
          label={'Office Price'}
          state={price}
          setState={setPrice}
          type={NUMBER}
        />
        <CustomDropdown
          label={'Office Equipments'}
          placeholder={'Choose Office Equipments'}
          options={equipments?.results}
          state={selectedEquipments}
          setState={setSelectedEquipments}
          labelField={'name'}
          valueField={'id'}
          isMulti={true}
        />
      </View>
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default office
