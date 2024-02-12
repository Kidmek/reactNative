import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import styles from './styles/warehouse.style'
import { NUMBER, PRODUCT, WAREHOUSE } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import {
  addInsurance,
  getAllInsuranceAgents,
} from '../../api/product/insurance'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import { COLORS } from '../../constants'
import { useSelector } from 'react-redux'
import { selectIsFetching, selectUser } from '../../features/data/dataSlice'
import { getWarehouses } from '../../api/warehouse/warehouse'
import { getAllProducts } from '../../api/product/product'
import { getAllCustomers } from '../../api/users'
import { getMappedStorages } from '../../api/storage/storage'

const insurance = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()
  const fetching = useSelector(selectIsFetching)
  const [name, setName] = useState()
  const [space, setSpace] = useState()
  const [price, setPrice] = useState()
  const [type, setType] = useState()
  const [storageTypes, setStorageTypes] = useState()
  const [agents, setAgents] = useState()
  const [agent, setAgent] = useState()
  const [products, setProducts] = useState()
  const [product, setProduct] = useState()
  const [completeCustomer, setCompleteCustomer] = useState()
  const [customers, setCustomers] = useState()
  const [customer, setCustomer] = useState()
  const [warehouses, setWarehouses] = useState()
  const [warehouse, setWarehouse] = useState()
  const user = useSelector(selectUser)

  const onAdd = () => {
    addInsurance(
      {
        product: params?.typeId === 1 ? product : '',
        insurancetype: params?.typeId,
        warehouse: params?.typeId === 2 ? warehouse : '',
        mapping: params?.typeId === 3 ? type : '',
        cost: null,
        agent: agent,
        paid: false,
        accepted: false,
        completed: false,
        confirmed: false,
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
  }
  useEffect(() => {
    getAllInsuranceAgents(null, dispatch, setAgents, toast)
    if (!user?.groups?.length) {
      getAllProducts(null, dispatch, setProducts, toast)
    } else {
      if (params.type?.toLowerCase() === WAREHOUSE) {
        getWarehouses(null, dispatch, setWarehouses, toast)
      } else if (params.type?.toLowerCase() === PRODUCT) {
        getAllCustomers(null, dispatch, setCustomers, toast)
      } else if (params.typeId === 3) {
        getMappedStorages(null, dispatch, setStorageTypes, toast)
      }
    }
  }, [])

  useEffect(() => {
    setCompleteCustomer(
      customers?.results?.filter((single) => single.id === customer)[0]
    )
  }, [customer])
  return (params?.typeId === 1 && user?.groups?.length && !customers) ||
    (params?.typeId === 2 && !warehouse) ||
    (params?.typeId === 3 && !storageTypes) ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {params.type} Insurance Information
        </Text>
      </View>
      <View style={styles.inputContainer}>
        {params.type?.toLowerCase() === PRODUCT && (
          <>
            {user?.groups?.length > 0 && (
              <CustomDropdown
                label={'Choose A Customer'}
                options={customers?.results}
                placeholder={'Select A Customer'}
                state={customer}
                setState={setCustomer}
                labelField={'first_name'}
                valueField={'id'}
              />
            )}
            <CustomDropdown
              label={
                completeCustomer?.first_name
                  ? completeCustomer?.first_name + "'s Product"
                  : 'Product'
              }
              options={products?.results ?? completeCustomer?.productdetail}
              placeholder={'Select A Product'}
              state={product}
              setState={setProduct}
              labelField={'product_name'}
              valueField={'id'}
            />
          </>
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
        {params?.typeId === 3 && (
          <CustomDropdown
            label={'Storage Type'}
            options={storageTypes?.results}
            placeholder={'Select A Storage Type'}
            state={type}
            setState={setType}
            labelField={'warehouse_storage_type.storage_name'}
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
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default insurance
