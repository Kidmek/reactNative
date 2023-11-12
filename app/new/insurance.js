import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import styles from './styles/warehouse.style'
import { NUMBER, PRODUCT, WAREHOUSE } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { getAllInsuranceAgents } from '../../api/product/insurance'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import { COLORS } from '../../constants'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'
import { getWarehouses } from '../../api/warehouse/warehouse'
import { getAllProducts } from '../../api/product/product'

const insurance = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const [name, setName] = useState()
  const [space, setSpace] = useState()
  const [price, setPrice] = useState()
  const [agents, setAgents] = useState()
  const [agent, setAgent] = useState()
  const [products, setProducts] = useState()
  const [product, setProduct] = useState()
  const [customers, setCustomers] = useState()
  const [customer, setCustomer] = useState()
  const [warehouses, setWarehouses] = useState()
  const [warehouse, setWarehouse] = useState()
  useEffect(() => {
    getAllInsuranceAgents(null, dispatch, setAgents, toast)
    if (params.type?.toLowerCase() === WAREHOUSE) {
      getWarehouses(null, dispatch, setWarehouses, toast)
    } else if (params.type?.toLowerCase() === PRODUCT) {
      getAllProducts(null, dispatch, setProducts, toast)
    }
  }, [])
  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {params.type} Insurance Information
        </Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        {params.type?.toLowerCase() === PRODUCT && (
          <CustomDropdown
            label={'Product'}
            options={products?.results}
            placeholder={'Select A Product'}
            state={product}
            setState={setProduct}
            labelField={'product_name'}
            valueField={'id'}
          />
        )}
        {params.type?.toLowerCase() === WAREHOUSE && (
          <CustomDropdown
            label={'Warehouses'}
            options={warehouses?.results}
            placeholder={'Select A Warehouse'}
            state={warehouse}
            setState={setWarehouse}
            labelField={'warehouse_name'}
            valueField={'id'}
          />
        )}
        <CustomDropdown
          label={'Insurance Agents'}
          options={agents?.results}
          placeholder={'Select An Agent'}
          state={agent}
          setState={setAgent}
          labelField={'first_name'}
          valueField={'id'}
        />
      </View>
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default insurance
