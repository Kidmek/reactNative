import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from '../../common/styles/warehouse.style'
import Footer from '../../../components/common/footer/Footer'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import CustomDropdown from '../../../components/common/dropdown/CustomDropdown'
import { COLORS } from '../../../constants'
import { useSelector } from 'react-redux'
import { selectIsFetching, selectUser } from '../../../features/data/dataSlice'
import { addTransits, getPorts } from '../../../api/shipment/shipment'
import { getAllCustomers } from '../../../api/users'
import { getAllProducts } from '../../../api/product/product'

const NewTransit = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()
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
  const user = useSelector(selectUser)

  const onAdd = () => {
    addTransits(
      {
        port,
        customer,
        product,
        transitor,
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
  }

  useEffect(() => {
    getPorts(null, dispatch, setPorts, toast)
    if (user?.groups?.length) {
      getAllCustomers(null, dispatch, setCustomers, toast)
    }
    getAllProducts(null, dispatch, setProducts, toast)
  }, [])

  return user?.groups?.length &&
    !customers &&
    !ports &&
    !(ports && customers && products) ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transit Information</Text>
      </View>
      <View style={styles.inputContainer}>
        {user?.groups?.length > 0 && (
          <CustomDropdown
            label={'Customer'}
            options={customers?.results}
            placeholder={'Select A Customer'}
            state={customer}
            setState={setCustomer}
            labelField={'first_name'}
            valueField={'id'}
          />
        )}

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
        {port && (
          <CustomDropdown
            label={'Transitor'}
            options={port?.transitorlist}
            placeholder={'Select A Transitor'}
            state={transitor}
            setState={setTransitor}
            labelField={'first_name'}
            valueField={'id'}
          />
        )}
      </View>
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default NewTransit
