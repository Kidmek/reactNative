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
const NewOrder = ({ wizard, params, data }) => {
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
  const [selectedStroage, setSelectedStroage] = useState([])
  const [selectedOffices, setSelectedOffices] = useState([])
  const [wantStorage, setWantStorage] = useState(false)
  const [storageSpace, setStorageSpace] = useState()
  const toast = useToast()

  const checkIfExists = (id, type) => {
    if (type == STORAGE) {
      return selectedStroage.includes(id)
    } else {
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
    getAllCustomers(null, dispatch, setCustomers, toast)
    if (wizard !== SPACE) {
      if (params?.type == WAREHOUSE) {
        getWarehouseDetails(params?.id, dispatch, setWarehouse, toast)
      } else if (params?.type == STORAGE) {
        getMappedStorageDetails(params?.id, dispatch, setStorage, toast)
      }
    }
  }, [params?.id])

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
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
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
              ? warehouse?.space + mSQUARE
              : storage?.available_space + mSQUARE}
          </Text>
        </View>
        <View style={newOrderStyles.singleInfoContainer}>
          <Text style={newOrderStyles.singleLabel}>{'Price /' + mSQUARE}</Text>
          <Text style={newOrderStyles.singleValue}>
            {params?.type === WAREHOUSE
              ? warehouse?.full_price + ' Birr'
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
        <Input
          label={'How much space do you want?'}
          state={space}
          setState={setSpace}
          type={NUMBER}
        />
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
                                        setSelectedOffices([
                                          ...selectedOffices,
                                          office?.id,
                                        ])
                                    : () =>
                                        setSelectedOffices((prev) =>
                                          prev.filter((id) => id != office?.id)
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
                                        setSelectedOffices([
                                          ...selectedOffices,
                                          office?.id,
                                        ])
                                    : () =>
                                        setSelectedOffices((prev) =>
                                          prev.filter((id) => id != office?.id)
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
                state={wantStorage}
                setState={(value) => setWantStorage(value)}
              />

              {wantStorage &&
                (warehouse?.warehousestoragemappings &&
                warehouse?.warehousestoragemappings?.length ? (
                  <WantStorage
                    storages={warehouse?.warehousestoragemappings}
                    storageSpace={storageSpace}
                    selectedStroage={selectedStroage}
                    setStorageSpace={setStorageSpace}
                    checkIfExists={checkIfExists}
                    setSelectedStroage={setSelectedStroage}
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
          state={startDate}
        />
        <Input
          type={DATE}
          label={'End Date'}
          placeholder={'Select An End Date'}
          setWhichToShow={setWhichToShow}
          id={'end'}
          state={endDate}
        />

        {(whichToShow === 'start' || whichToShow === 'end') && (
          <DateTimePicker
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            onChange={(e, selectedDate) => {
              whichToShow == 'start'
                ? setStartDate(selectedDate.toDateString())
                : setEndDate(selectedDate.toDateString())
              setWhichToShow(null)
            }}
          />
        )}
        {!wizard && <Footer onSave={onAdd} />}
      </View>
    </ScrollView>
  )
}

export default NewOrder