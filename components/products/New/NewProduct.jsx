import { View, Text, Button, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import styles from '../../common/styles/warehouse.style'
import { ScrollView } from 'react-native'
import { COLORS, SIZES } from '../../../constants'
import { useEffect } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import Input from '../../../components/common/input/Input'
import { DATE, DIMENSION, NUMBER } from '../../../constants/strings'
import {
  addProduct,
  getProductCategories,
  getProductTypes,
} from '../../../api/product/product'
import { getAllCustomers } from '../../../api/users'
import CustomDropdown from '../../../components/common/dropdown/CustomDropdown'
import DateTimePicker from '@react-native-community/datetimepicker'
import Footer from '../../../components/common/footer/Footer'
import { useNavigation } from 'expo-router'

const NewProduct = ({ wizard, product, setProduct }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()

  const [types, setTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [customers, setCustomers] = useState([])
  const [user, setUser] = useState()
  const [type, setType] = useState()
  const [category, setCategory] = useState()
  const [name, setName] = useState()
  const [SKU, setSKU] = useState()
  const [totalWeight, setTotalWeight] = useState()
  const [whichToShow, setWhichToShow] = useState()
  const [expireDate, setExpireDate] = useState()
  const [arrivingDate, setArrivingDate] = useState()
  const [weight, setWeight] = useState()
  const [qty, setQty] = useState()
  const [pricePer, setPricePer] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState()
  const [dimensions, setDimensions] = useState({
    length: null,
    width: null,
    height: null,
  })

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
  const onAdd = () => {
    let newDate = new Date(expireDate)
    addProduct(
      {
        user,
        length: dimensions.length,
        width: dimensions.width,
        height: dimensions.height,
        product_type: type,
        category,
        available: qty,
        product_name: name,
        weight: parseFloat(weight) * parseFloat(qty),
        price_unit: pricePer,
        weight_unit: weight,
        clerance_url: '',
        warehouse_id: '',
        sku: SKU,
        expire_date: newDate.toISOString().split('T')[0],
        price: parseFloat(pricePer) * parseFloat(qty),
        quantity: qty,
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
  }

  useEffect(() => {
    getProductCategories(null, dispatch, setCategories, toast)
    getProductTypes(null, dispatch, setTypes, toast)
    getAllCustomers(null, dispatch, setCustomers, toast)
  }, [])

  return !categories || !types || !customers ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={wizard ? '' : styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {wizard ? 'Create New Product' : 'Product Information'}
        </Text>
        {/* */}
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Product Name'} state={name} setState={setName} />
        <CustomDropdown
          label={'Customer'}
          options={customers?.results}
          placeholder={'Select A Customer'}
          state={user}
          setState={setUser}
          labelField={'first_name'}
          valueField={'id'}
        />
        <Input label={'SKU'} state={SKU} setState={setSKU} type={NUMBER} />
        <CustomDropdown
          label={'Product Type'}
          options={types?.results}
          placeholder={'Select A Product Type'}
          state={type}
          setState={setType}
          labelField={'product_type_name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Product Category'}
          options={categories?.results}
          placeholder={'Select A Product Category'}
          state={category}
          setState={setCategory}
          labelField={'category_name'}
          valueField={'id'}
        />
        <Input
          label={'Unit Dimension'}
          state={dimensions}
          setState={setDimensions}
          type={DIMENSION}
        />
        <Input label={'Quantity'} state={qty} setState={setQty} type={NUMBER} />
        <Input
          label={'Unit Weight (kg)'}
          state={weight}
          setState={setWeight}
          type={NUMBER}
        />

        <Input
          label={'Unit Price (Birr)'}
          state={pricePer}
          setState={setPricePer}
          type={NUMBER}
        />

        {/* <View style={{ ...styles.inputWrapper, marginBottom: SIZES.medium }}>
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
        </View> */}

        <Input
          type={DATE}
          label={'Expire Date'}
          placeholder={'Select An Expire Date'}
          setWhichToShow={setWhichToShow}
          id={'ex'}
          state={expireDate}
        />
        {/* <Input
          type={DATE}
          label={'Arriving Date'}
          placeholder={'Select An Arrival Date'}
          setWhichToShow={setWhichToShow}
          id={'ar'}
          state={arrivingDate}
        /> */}

        {(whichToShow === 'ex' || whichToShow === 'ar') && (
          <DateTimePicker
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            dateFormat='longdate'
            onChange={(e, selectedDate) => {
              whichToShow == 'ex'
                ? setExpireDate(selectedDate.toDateString())
                : setArrivingDate(selectedDate.toDateString())
              setWhichToShow(null)
            }}
          />
        )}
      </View>
      {!wizard && <Footer onSave={onAdd} />}
    </ScrollView>
  )
}

export default NewProduct
