import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import { useEffect } from 'react'
import { getManaged } from '../../api/warehouse/warehouse'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { FontAwesome5 } from '@expo/vector-icons'
import Input from '../../components/common/input/Input'
import { MULTI, NUMBER } from '../../constants/strings'
import {
  getProductCategories,
  getProductTypes,
} from '../../api/product/product'
import { getAllUser } from '../../api/users'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInput } from 'react-native-gesture-handler'

const product = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [warehouses, setWarehouses] = useState([])

  const [types, setTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [customers, setCustomers] = useState([])
  const [user, setUser] = useState()
  const [type, setType] = useState()
  const [category, setCategory] = useState()
  const [warehouse, setWarehouse] = useState()
  const [name, setName] = useState()
  const [totalWeight, setTotalWeight] = useState()
  const [whichToShow, setWhichToShow] = useState()
  const [expireDate, setExpireDate] = useState()
  const [arrivingDate, setArrivingDate] = useState()
  const [weight, setWeight] = useState()
  const [qty, setQty] = useState()
  const [pricePer, setPricePer] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: false,
      selectionLimit: 6,
    })
    if (!result.canceled && result.assets.length) {
      setImage(result.assets[0].uri)
    }
  }

  useEffect(() => {
    getManaged(null, dispatch, setWarehouses, toast)
    getProductCategories(null, dispatch, setCategories, toast)
    getProductTypes(null, dispatch, setTypes, toast)
    getAllUser(null, dispatch, setCustomers, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{'Product Information'}</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Product Name'} state={name} setState={setName} />
        <CustomDropdown
          label={'Customer'}
          options={customers?.users}
          placeholder={'Select A Customer'}
          state={user}
          setState={setUser}
          labelField={'users_r.first_name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Product Type'}
          options={types?.data}
          placeholder={'Select A Product Type'}
          state={type}
          setState={setType}
          labelField={'product_type_name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Product Category'}
          options={categories?.data}
          placeholder={'Select A Product Category'}
          state={category}
          setState={setCategory}
          labelField={'category_name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Warehouse'}
          options={warehouses?.warehouse}
          placeholder={'Select A Warehouse'}
          state={warehouse}
          setState={setWarehouse}
          labelField={'warehouse_name'}
          valueField={'id'}
        />

        <Input label={'Quantity'} state={qty} setState={setQty} type={NUMBER} />
        <Input
          label={'Weight / Unit'}
          state={weight}
          setState={setWeight}
          type={NUMBER}
        />
        <Input
          label={'Total Weight'}
          state={totalWeight}
          setState={setTotalWeight}
          type={NUMBER}
        />
        <Input
          label={'Price / Unit'}
          state={pricePer}
          setState={setPricePer}
          type={NUMBER}
        />
        <Input
          label={'Total Price'}
          state={price}
          setState={setPrice}
          type={NUMBER}
        />
        <Input
          label={'Warehouse Description'}
          state={description}
          setState={setDescription}
          type={MULTI}
        />

        <View style={{ ...styles.inputWrapper, marginBottom: SIZES.medium }}>
          <Text style={styles.inputLabel}>Product Clerance</Text>
          <View style={styles.imageInputWrapper}>
            {image ? (
              <Image style={styles.image} source={{ uri: image }} />
            ) : (
              <FontAwesome5 size={70} name='image' />
            )}

            <Button
              title='Change'
              color={COLORS.secondary}
              onPress={pickImage}
            />
          </View>
        </View>

        <View style={{ ...styles.inputWrapper, position: 'relative' }}>
          <Text style={styles.inputLabel}>Expire Date</Text>
          <View>
            <TextInput
              style={styles.input}
              value={expireDate}
              editable={false}
              placeholder='Select An Expire Date'
            />
            <TouchableOpacity
              style={styles.dateIcon}
              onPress={() => {
                setWhichToShow('ex')
              }}
            >
              <FontAwesome5
                name='calendar-alt'
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ ...styles.inputWrapper, position: 'relative' }}>
          <Text style={styles.inputLabel}>Arriving Date</Text>
          <View>
            <TextInput
              style={styles.input}
              value={arrivingDate}
              editable={false}
              placeholder='Select An Arrival Date'
            />
            <TouchableOpacity
              style={styles.dateIcon}
              onPress={() => {
                setWhichToShow('ex')
              }}
            >
              <FontAwesome5
                name='calendar-alt'
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        {(whichToShow === 'ex' || whichToShow === 'ar') && (
          <DateTimePicker
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            onChange={(e, selectedDate) => {
              whichToShow == 'ex'
                ? setExpireDate(selectedDate.toLocaleDateString())
                : setArrivingDate(selectedDate.toLocaleDateString())
              setWhichToShow(null)
            }}
          />
        )}
      </View>
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

export default product
