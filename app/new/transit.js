import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from './styles/warehouse.style'
import { WAREHOUSE } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import { COLORS } from '../../constants'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'
import { getPorts } from '../../api/shipment/shipment'
import { getAllCustomers } from '../../api/users'
import { getAllProducts } from '../../api/product/product'

const transit = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const [name, setName] = useState()
  const [space, setSpace] = useState()
  const [price, setPrice] = useState()
  const [transitor, setTransitor] = useState()
  const [products, setProducts] = useState()
  const [product, setProduct] = useState()
  const [customers, setCustomers] = useState()
  const [customer, setCustomer] = useState()
  const [ports, setPorts] = useState()
  const [port, setPort] = useState()

  useEffect(() => {
    getPorts(null, dispatch, setPorts, toast)
    getAllCustomers(null, dispatch, setCustomers, toast)
    getAllProducts(null, dispatch, setProducts, toast)
  }, [])
  useEffect(() => {}, [ports, customers, products])
  return !(ports && customers && products) ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transit Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomDropdown
          label={'Customer'}
          options={customers?.results}
          placeholder={'Select A Customer'}
          state={customer}
          setState={setCustomer}
          labelField={'first_name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Product'}
          options={products?.results}
          placeholder={'Select A Product'}
          state={product}
          setState={setProduct}
          labelField={'product_name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Port'}
          options={ports?.results}
          placeholder={'Select A Port'}
          state={port?.id}
          setOtherState={setPort}
          labelField={'name'}
          valueField={'id'}
        />
        <CustomDropdown
          label={'Transitor'}
          options={port?.transitorlist}
          placeholder={'Select A Transitor'}
          state={transitor}
          setState={setTransitor}
          labelField={'first_name'}
          valueField={'id'}
        />
      </View>
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default transit
