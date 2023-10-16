import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { getOfficeEquipments, getOffices } from '../../api/office/office'
import { getReceptions } from '../../api/reception/reception'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useToast } from 'react-native-toast-notifications'
import { Dropdown } from 'react-native-element-dropdown'
import styles from './styles/warehouse.style'
import { COLORS } from '../../constants'
import Input from '../../components/common/input/Input'
import { NUMBER, OFFICE } from '../../constants/strings'
import { store } from '../../store'
import { selectIsFetching } from '../../features/data/dataSlice'
import { useSelector } from 'react-redux'

const reource = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const [receptions, setReceptions] = useState([])
  const [offices, setOffices] = useState([])
  const [equipments, setEquipments] = useState([])
  const [equipment, setEquipment] = useState()
  const [office, setOffice] = useState()
  const [reception, setReception] = useState()
  const [price, setPrice] = useState()
  const toast = useToast()

  useEffect(() => {
    getReceptions(null, dispatch, setReceptions, toast)
    if (params.type === OFFICE) {
      getOfficeEquipments(null, dispatch, setEquipments, toast)
    } else {
      getOffices(null, dispatch, setOffices, toast)
    }
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {params.name} Resource Information
        </Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Choose Reception</Text>
            <Dropdown
              style={styles.input}
              data={receptions?.data || []}
              placeholder='Select Reception'
              value={reception}
              labelField='users_r.first_name'
              valueField='id'
              onChange={(item) => {
                setReception(item.id)
              }}
              renderItem={(item) => {
                return (
                  <View style={styles.dropDownItemContainer}>
                    <Text style={styles.dropDownText}>
                      {item.users_r.first_name}
                    </Text>
                  </View>
                )
              }}
            />
          </View>
          {params.type === OFFICE ? (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Choose Equipments</Text>
              <Dropdown
                style={styles.input}
                data={equipments?.data || []}
                placeholder='Select Equipments'
                value={equipment}
                labelField='name'
                valueField='id'
                onChange={(item) => {
                  setOffice(item.id)
                }}
                renderItem={(item) => {
                  return (
                    <View style={styles.dropDownItemContainer}>
                      <Text style={styles.dropDownText}>{item.name}</Text>
                    </View>
                  )
                }}
              />
            </View>
          ) : (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Choose Office</Text>
              <Dropdown
                style={styles.input}
                data={offices?.data || []}
                placeholder='Select Office'
                value={office}
                labelField='name'
                valueField='name'
                onChange={(item) => {
                  setOffice(item.name)
                }}
                renderItem={(item) => {
                  return (
                    <View style={styles.dropDownItemContainer}>
                      <Text style={styles.dropDownText}>{item.name}</Text>
                    </View>
                  )
                }}
              />
            </View>
          )}

          <Input
            label={'Total Price'}
            state={price}
            setState={setPrice}
            type={NUMBER}
          />
        </View>
      )}
      <View style={styles.footer}>
        <Button
          title='Cancel'
          style={styles.btn}
          color={COLORS.gray}
          onPress={() => {}}
        />
        <Button
          title='Save'
          style={styles.btn}
          color={COLORS.primary}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  )
}

export default reource
