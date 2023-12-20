import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { COLORS } from '../../constants'
import { useEffect } from 'react'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import Input from '../../components/common/input/Input'
import { MULTI, NUMBER } from '../../constants/strings'
import { addDamagedProduct, getAllProducts } from '../../api/product/product'
import { getAllCustomers } from '../../api/users'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import { getStorages } from '../../api/storage/storage'
import Footer from '../../components/common/footer/Footer'
import Info from '../../components/common/cards/info/Info'
import { useNavigation } from 'expo-router'

const damaged_product = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [storages, setStorages] = useState([])
  const [storage, setStorage] = useState()
  const [product, setProduct] = useState()
  const [customer, setCustomer] = useState()
  const [reason, setReason] = useState()
  const [qty, setQty] = useState()
  const [initialqty, setInitialqty] = useState()

  const onAdd = () => {
    addDamagedProduct(
      {
        customer,
        initialqty,
        product,
        productqty: qty,
        returned_reason: reason,
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
  }

  useEffect(() => {
    getAllProducts(null, dispatch, setProducts, toast)
    getAllCustomers(null, dispatch, setCustomers, toast)
    getStorages(null, dispatch, setStorages, toast)
  }, [])

  useEffect(() => {
    if (product) {
      setInitialqty(
        products.results.filter((single) => single?.id === product)[0]
          ?.available
      )
    }
  }, [product])

  return !products.results ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Damaged Product Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomDropdown
          label={'Choose A Customer'}
          options={customers?.results}
          placeholder={'Select A Customer'}
          state={customer}
          setState={setCustomer}
          labelField={'first_name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Choose Damaged Product'}
          options={products?.results}
          placeholder={'Select A Product '}
          state={product}
          setState={setProduct}
          labelField={'product_name'}
          valueField={'id'}
        />

        {/* <CustomDropdown
          label={'Choose Product Storage'}
          options={storages?.data}
          placeholder={'Select A Storage '}
          state={storage}
          setState={setStorage}
          labelField={'storage_name'}
          valueField={'id'}
        /> */}
        {product && initialqty && (
          <Info
            text={'Total Product Qty On Stroage:' + initialqty}
            withoutIcon={true}
          />
        )}

        <Input label={'Quantity'} state={qty} setState={setQty} type={NUMBER} />

        <Input
          label={'Damage Cause'}
          state={reason}
          setState={setReason}
          type={MULTI}
        />
      </View>
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default damaged_product
