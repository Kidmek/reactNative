import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../components/common/input/Input'
import styles from './styles/warehouse.style'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import { getTransportationMethods } from '../../api/shipment/shipment'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'

const shipment_method = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [name, setName] = useState()
  const [type, setType] = useState()
  const [methods, setMethods] = useState()
  const [weight, setWeight] = useState()
  const [plate, setPlate] = useState()
  const [desc, setDesc] = useState()

  useEffect(() => {
    getTransportationMethods(null, dispatch, setMethods, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transportation Information</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Transportation Name'} state={name} setState={setName} />
        <CustomDropdown
          label={'Transportation Type'}
          options={methods?.results}
          placeholder={'Select A Method'}
          state={type}
          setState={setType}
          labelField={'name'}
          valueField={'id'}
        />
        <Input label={'Plate Number'} state={plate} setState={setPlate} />
        <Input label={'Max Weight'} state={weight} setState={setWeight} />
        <Input
          label={'Transportation Description'}
          state={desc}
          type={MULTI}
          setState={setDesc}
        />
      </View>
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default shipment_method
