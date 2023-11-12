import { View, Text, Button } from 'react-native'
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
import { getAllProducts } from '../../api/product/product'
import { getAllUser } from '../../api/users'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import Footer from '../../components/common/footer/Footer'

const return_products = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState()
  const [customer, setCustomer] = useState()
  const [reason, setReason] = useState()
  const [qty, setQty] = useState()

  useEffect(() => {
    getAllProducts(null, dispatch, setProducts, toast)
    getAllUser(null, dispatch, setCustomers, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Return Product Information</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomDropdown
          label={'Choose A Customer'}
          options={customers?.users}
          placeholder={'Select A Customer'}
          state={customer}
          setState={setCustomer}
          labelField={'users_r.first_name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Choose A Product'}
          options={products?.data}
          placeholder={'Select A Product '}
          state={product}
          setState={setProduct}
          labelField={'product_name'}
          valueField={'id'}
        />

        <Input label={'Quantity'} state={qty} setState={setQty} type={NUMBER} />

        <Input
          label={'Return Reason'}
          state={reason}
          setState={setReason}
          type={MULTI}
        />
      </View>
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default return_products
