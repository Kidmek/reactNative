import {
  ActivityIndicator,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsFetching, setFetching } from '../../../features/data/dataSlice'
import { AntDesign } from '@expo/vector-icons'
import { useEffect } from 'react'
import {
  DATE,
  MANAGED,
  NUMBER,
  SPACE,
  STORAGE,
  UNMANAGED,
  WAREHOUSE,
  mSQUARE,
} from '../../../constants/strings'
import { getWarehouseDetails } from '../../../api/warehouse/warehouse'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { COLORS, SIZES } from '../../../constants'
import styles from '../../common/styles/warehouse.style'
import newOrderStyles from '../../common/styles/order.style'
import detailsStyles from '../../common/styles/common.style'
import { getAllCustomers } from '../../../api/users'
import CustomDropdown from '../../../components/common/dropdown/CustomDropdown'
import Input from '../../../components/common/input/Input'
import Info from '../../../components/common/cards/info/Info'
import DateTimePicker from '@react-native-community/datetimepicker'
import Footer from '../../../components/common/footer/Footer'
import { getMappedStorageDetails } from '../../../api/storage/storage'
import CheckQuestion from '../../../components/common/checkQuestion/CheckQuestion'
import WantStorage from '../../home/storageTypes/WantStorage'
import { useNavigation } from 'expo-router'
import { addOrder } from '../../../api/order/order'
const NewOrder = ({ wizard, params, data, order, setOrder }) => {
  const dispatch = store.dispatch
  const navigate = useNavigation()
  const fetching = useSelector(selectIsFetching)
  const [warehouse, setWarehouse] = useState()
  const [customers, setCustomers] = useState()
  const [customer, setCustomer] = useState()
  const [space, setSpace] = useState()
  const [type, setType] = useState()
  const [storage, setStorage] = useState()
  const [startDate, setStartDate] = useState()
  const [whichToShow, setWhichToShow] = useState()
  const [endDate, setEndDate] = useState()
  const [selectedStorage, setSelectedStorage] = useState([])
  const [selectedOffices, setSelectedOffices] = useState([])
  const [selectedHRS, setSelectedHRS] = useState([])
  const [wantStorage, setWantStorage] = useState(false)
  const [storageSpace, setStorageSpace] = useState()
  const toast = useToast()

  const getValue = (isMinimum, isMaximum) => {
    let value = ''
    if (!isMaximum && (whichToShow == 'start' || isMinimum)) {
      if (order) {
        value = order?.startDate
      } else {
        value = startDate
      }
    } else {
      if (order) {
        value = order?.endDate
      } else {
        value = endDate
      }
    }
    return value ? new Date(value) : new Date()
  }

  const checkIfExists = (id, type) => {
    if (type == STORAGE) {
      if (order) {
        return order?.selectedStorage?.includes(id)
      }
      return selectedStorage.includes(id)
    } else if (type == 'HUMAN') {
      if (order) {
        return order?.selectedHRS?.includes(id)
      }
      return selectedHRS.includes(id)
    } else {
      if (order) {
        return order?.selectedOffices?.includes(id)
      }
      return selectedOffices.includes(id)
    }
  }
  const onAdd = () => {
    const newEndDate = new Date(endDate)
    const newStartDate = new Date(startDate)
    // To calculate the time difference of two dates
    let Difference_In_Time = newEndDate.getTime() - newStartDate.getTime()

    // To calculate the no. of days between two dates
    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))
    const storageData =
      params?.type === WAREHOUSE
        ? {}
        : {
            ordered_price:
              parseFloat(space) * parseFloat(storage?.available_space),
            price:
              parseFloat(space) * parseFloat(storage?.available_space) * 1.15,
          }

    addOrder(
      {
        mapped_warehouse: params?.type === STORAGE ? params?.id : '',
        warehouse: params?.type === WAREHOUSE ? '' : params?.id,
        storage: [],
        order_type: params?.params?.typeId,
        customer: customer,
        space_to_rent: space,
        storage_spaces: [],
        office: [],
        equipments: [],
        resource: [],
        starting_date: newStartDate.toISOString().split('T')[0],
        end_date: newEndDate.toISOString().split('T')[0],
        remaining_date: Difference_In_Days,
        status: 'initialized',
        ...storageData,
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
  }
  useEffect(() => {
    if (!wizard) {
      getAllCustomers(null, dispatch, setCustomers, toast)
    }
    if (wizard !== SPACE) {
      if (params?.type == WAREHOUSE) {
        getWarehouseDetails(params?.id, dispatch, setWarehouse, toast)
      } else if (params?.type == STORAGE) {
        getMappedStorageDetails(params?.id, dispatch, setStorage, toast)
      }
    }
  }, [params?.id])

  useEffect(() => {
    if (params?.type == WAREHOUSE) {
      setOrder({
        ...order,
        warehouse: warehouse?.warehouse_name,
        rate: warehouse?.price_m2,
      })
    } else if (params?.type == STORAGE) {
      setOrder({
        ...order,
        storage: storage?.warehouse_storage_type?.storage_name,
        rate: storage?.price_m2,
      })
    }
  }, [warehouse, storage])

  useEffect(() => {
    if (data) {
      if (params?.type == WAREHOUSE) {
        setWarehouse(data)
      } else if (params?.type == STORAGE) {
        setStorage(data)
      }
    }
  }, [data])

  return fetching ? (
    <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      {!wizard === SPACE && (
        <Text style={detailsStyles.wizTitle}>
          {params?.type === WAREHOUSE
            ? warehouse?.warehouse_name
            : storage?.warehouse_storage_type?.storage_name}{' '}
          <Text> Order Information</Text>
        </Text>
      )}
      <View style={newOrderStyles.infoContainer}>
        <View style={newOrderStyles.singleInfoContainer}>
          <Text style={newOrderStyles.singleLabel}>Available Space</Text>
          <Text style={newOrderStyles.singleValue}>
            {params?.type === WAREHOUSE
              ? warehouse?.available_space + mSQUARE
              : storage?.available_space + mSQUARE}
          </Text>
        </View>
        <View style={newOrderStyles.singleInfoContainer}>
          <Text style={newOrderStyles.singleLabel}>{'Price /' + mSQUARE}</Text>
          <Text style={newOrderStyles.singleValue}>
            {params?.type === WAREHOUSE
              ? warehouse?.price_m2 + ' Birr'
              : storage?.price_m2 + ' Birr'}
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        {!wizard && (
          <CustomDropdown
            label={'Choose Customer'}
            options={customers?.results}
            placeholder={'Select A Customer'}
            state={customer}
            setState={setCustomer}
            labelField={'first_name'}
            valueField={'id'}
          />
        )}
        {(!wizard || params.type !== WAREHOUSE) && (
          <Input
            label={'How much space do you want?'}
            state={order ? order?.space : space}
            setState={
              order ? (value) => setOrder({ ...order, space: value }) : setSpace
            }
            type={NUMBER}
          />
        )}
        {params.type == WAREHOUSE && wizard !== SPACE && (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>
              How do you want to use this warehouse?
            </Text>
            {/* TYPE */}
            <View style={newOrderStyles.typeContainer}>
              <TouchableOpacity
                style={newOrderStyles.singleType(type == MANAGED)}
                onPress={() => setType(MANAGED)}
              >
                <View style={newOrderStyles.typeTextContainer}>
                  <Text style={newOrderStyles.typeTitle(type == MANAGED)}>
                    Managed
                  </Text>
                  <Text style={newOrderStyles.typeDesc(type == MANAGED)}>
                    Warehouse With Human Resources
                  </Text>
                </View>
                <AntDesign
                  name={type == MANAGED ? 'upcircleo' : 'downcircleo'}
                  size={20}
                  color={type == MANAGED ? COLORS.blue : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={newOrderStyles.singleType(type == UNMANAGED)}
                onPress={() => setType(UNMANAGED)}
              >
                <View style={newOrderStyles.typeTextContainer}>
                  <Text style={newOrderStyles.typeTitle(type == UNMANAGED)}>
                    None Managed
                  </Text>
                  <Text style={newOrderStyles.typeDesc(type == UNMANAGED)}>
                    Warehouse Without Human Resources
                  </Text>
                </View>
                <AntDesign
                  name={type == UNMANAGED ? 'upcircleo' : 'downcircleo'}
                  size={20}
                  color={type == UNMANAGED ? COLORS.blue : 'black'}
                />
              </TouchableOpacity>
            </View>
            {/* MANAGED */}
            {type == MANAGED && (
              <View>
                <View>
                  <Text
                    style={{ ...styles.headerTitle, color: COLORS.primary }}
                  >
                    Offices
                  </Text>
                  {warehouse?.warehouseRecources?.length > 0 ? (
                    <View style={newOrderStyles.listContainer}>
                      {warehouse?.warehouseRecources?.map((office) => {
                        return (
                          <View
                            key={office?.id}
                            style={newOrderStyles.resourceContainer}
                          >
                            <Text style={detailsStyles.name}>
                              {office?.officeDetail?.name}
                            </Text>
                            <Text style={detailsStyles.type}>
                              Total Space:{' '}
                              {office?.officeDetail?.space + mSQUARE}
                            </Text>
                            <Text
                              style={{
                                ...detailsStyles.type,
                              }}
                            >
                              Price Without VAT:{' '}
                              {office?.officeDetail?.price + ' Birr/Day'}
                            </Text>
                            <View style={newOrderStyles.switchContainer}>
                              <Switch
                                trackColor={{
                                  false: '#767577',
                                  true: '#81b0ff',
                                }}
                                thumbColor={
                                  checkIfExists(office?.id)
                                    ? COLORS.blue
                                    : '#f4f3f4'
                                }
                                ios_backgroundColor='#3e3e3e'
                                onValueChange={
                                  !checkIfExists(office?.id)
                                    ? () =>
                                        order
                                          ? (value) =>
                                              setOrder({
                                                ...order,
                                                space: value,
                                              })
                                          : setSelectedOffices([
                                              ...selectedOffices,
                                              office?.id,
                                            ])
                                    : () =>
                                        order
                                          ? (value) =>
                                              setOrder({
                                                ...order,
                                                space: value,
                                              })
                                          : setSelectedOffices((prev) =>
                                              prev.filter(
                                                (id) => id != office?.id
                                              )
                                            )
                                }
                                value={checkIfExists(office?.id)}
                              />
                              <Text style={newOrderStyles.typeTitle(false)}>
                                Add {office?.officeDetail?.name}
                              </Text>
                            </View>
                          </View>
                        )
                      })}
                    </View>
                  ) : (
                    <Info
                      text={
                        " Currently this warehouse dosen't have assigned office resources yet !"
                      }
                    />
                  )}
                </View>
                <View>
                  <Text
                    style={{ ...styles.headerTitle, color: COLORS.primary }}
                  >
                    Human Resources
                  </Text>
                  {warehouse?.humanResources?.length > 0 ? (
                    <View style={newOrderStyles.listContainer}>
                      {warehouse?.humanResources?.map((human) => {
                        return (
                          <View
                            key={human?.id}
                            style={newOrderStyles.resourceContainer}
                          >
                            <Text style={detailsStyles.name}>
                              {office?.officeDetail?.name}
                            </Text>
                            <Text style={detailsStyles.type}>
                              Total Space:{' '}
                              {office?.officeDetail?.space + mSQUARE}
                            </Text>
                            <Text
                              style={{
                                ...detailsStyles.type,
                              }}
                            >
                              Price Without VAT:{' '}
                              {office?.officeDetail?.price + ' Birr/Day'}
                            </Text>

                            <View style={newOrderStyles.switchContainer}>
                              <Switch
                                trackColor={{
                                  false: '#767577',
                                  true: '#81b0ff',
                                }}
                                thumbColor={
                                  checkIfExists(office?.id)
                                    ? COLORS.blue
                                    : '#f4f3f4'
                                }
                                ios_backgroundColor='#3e3e3e'
                                onValueChange={
                                  !checkIfExists(office?.id)
                                    ? () =>
                                        order
                                          ? setOrder({
                                              ...order,
                                              offices: [
                                                ...selectedOffices,
                                                office?.id,
                                              ],
                                            })
                                          : setSelectedHRS([
                                              ...selectedOffices,
                                              office?.id,
                                            ])
                                    : () =>
                                        order
                                          ? setOrder({
                                              ...order,
                                              offices: order?.offices?.filter(
                                                (id) => id != office?.id
                                              ),
                                            })
                                          : setSelectedHRS((prev) =>
                                              prev.filter(
                                                (id) => id != office?.id
                                              )
                                            )
                                }
                                value={checkIfExists(office?.id)}
                              />
                              <Text style={newOrderStyles.typeTitle(false)}>
                                Add {office?.officeDetail?.name}
                              </Text>
                            </View>
                          </View>
                        )
                      })}
                    </View>
                  ) : (
                    <Info
                      text={
                        " Currently this warehouse dosen't have assigned human resources yet !"
                      }
                    />
                  )}
                </View>
              </View>
            )}
            {/* Storage Check */}
            <View>
              <CheckQuestion
                title={'Do you want to add storage type to this warehouse ?'}
                state={order ? order?.wantStorage : wantStorage}
                setState={(value) => {
                  order
                    ? setOrder({ ...order, wantStorage: value })
                    : setWantStorage(value)
                }}
              />

              {(wantStorage || order.wantStorage) &&
                (warehouse?.warehousestoragemappings?.length ? (
                  <WantStorage
                    storages={warehouse?.warehousestoragemappings}
                    storageSpace={order ? order?.storageSpace : storageSpace}
                    selectedStorage={
                      order ? order?.selectedStorage ?? [] : selectedStorage
                    }
                    setStorageSpace={
                      order
                        ? (value) => setOrder({ ...order, storageSpace: value })
                        : setStorageSpace
                    }
                    checkIfExists={checkIfExists}
                    setSelectedStorage={
                      order
                        ? (value) =>
                            setOrder({ ...order, selectedStorage: value })
                        : setSelectedStorage
                    }
                  />
                ) : (
                  <Info
                    text={
                      " Currently this warehouse dosen't have assigned storage type yet !"
                    }
                  />
                ))}
            </View>
          </View>
        )}
        <Input
          type={DATE}
          label={'Starting Date'}
          placeholder={'Select A Starting Date'}
          setWhichToShow={setWhichToShow}
          id={'start'}
          state={order ? order?.startDate : startDate}
        />
        <Input
          type={DATE}
          label={'End Date'}
          placeholder={'Select An End Date'}
          setWhichToShow={setWhichToShow}
          id={'end'}
          state={order ? order?.endDate : endDate}
        />

        {(whichToShow === 'start' || whichToShow === 'end') && (
          <DateTimePicker
            value={getValue(true)}
            mode={'date'}
            is24Hour={true}
            minimumDate={whichToShow === 'start' ? new Date() : getValue(true)}
            maximumDate={
              whichToShow === 'start'
                ? !order?.endDate && !endDate
                  ? null
                  : getValue(true, true)
                : null
            }
            onChange={(e, selectedDate) => {
              setWhichToShow(null)

              if (e.type === 'set') {
                if (whichToShow == 'start') {
                  if (order) {
                    setOrder({
                      ...order,
                      startDate: selectedDate.toDateString(),
                    })
                    return
                  } else {
                    setStartDate(selectedDate.toDateString())
                    return
                  }
                } else {
                  if (order) {
                    setOrder({ ...order, endDate: selectedDate.toDateString() })
                    return
                  } else {
                    setEndDate(selectedDate.toDateString())
                    return
                  }
                }
              }
            }}
          />
        )}
        {!wizard && <Footer onSave={onAdd} />}
      </View>
    </ScrollView>
  )
}

export default NewOrder
