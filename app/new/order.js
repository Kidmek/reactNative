import {
  ActivityIndicator,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Warehouse from '../../components/home/warehouse/Warehouse'
import { useSelector } from 'react-redux'
import { selectIsFetching, setFetching } from '../../features/data/dataSlice'
import { AntDesign } from '@expo/vector-icons'
import { useEffect } from 'react'
import {
  DATE,
  MANAGED,
  NUMBER,
  STORAGE,
  UNMANAGED,
  WAREHOUSE,
  mSQUARE,
} from '../../constants/strings'
import { getWarehouseDetails } from '../../api/warehouse/warehouse'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { COLORS, SIZES } from '../../constants'
import styles from './styles/warehouse.style'
import newOrderStyles from './styles/order.style'
import detailsStyles from '../../components/home/warehouse/warehouse.style'
import { getAllCustomers } from '../../api/users'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import Input from '../../components/common/input/Input'
import Info from '../../components/common/cards/info/Info'
import Checkbox from 'expo-checkbox'
import DateTimePicker from '@react-native-community/datetimepicker'
import Footer from '../../components/common/footer/Footer'
import { getMappedStorageDetails } from '../../api/storage/storage'
const order = () => {
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const params = useLocalSearchParams()
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
  const [wantStorage, setWantStorage] = useState()
  const [storageSpace, setStorageSpace] = useState()
  const toast = useToast()

  const checkIfExists = (id, type) => {
    if (type == STORAGE) {
      return selectedStroage.includes(id)
    } else {
      return selectedOffices.includes(id)
    }
  }

  useEffect(() => {
    if (params.type == WAREHOUSE) {
      getWarehouseDetails(params?.id, dispatch, setWarehouse, toast)
      getAllCustomers(null, dispatch, setCustomers, toast)
    } else if (params.type == STORAGE) {
      getMappedStorageDetails(params?.id, dispatch, setStorage, toast)
      getAllCustomers(null, dispatch, setCustomers, toast)
    }
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={newOrderStyles.infoContainer}>
        <View style={newOrderStyles.singleInfoContainer}>
          <Text style={newOrderStyles.singleLabel}>Available Space</Text>
          <Text style={newOrderStyles.singleValue}>
            {params.type === WAREHOUSE
              ? warehouse?.space + mSQUARE
              : storage?.available_space + mSQUARE}
          </Text>
        </View>
        <View style={newOrderStyles.singleInfoContainer}>
          <Text style={newOrderStyles.singleLabel}>{'Price /' + mSQUARE}</Text>
          <Text style={newOrderStyles.singleValue}>
            {params.type === WAREHOUSE
              ? warehouse?.full_price + ' Birr'
              : storage?.price_m2 + ' Birr'}
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <CustomDropdown
          label={'Choose Customer'}
          options={customers?.results}
          placeholder={'Select A Customer'}
          state={customer}
          setState={setCustomer}
          labelField={'first_name'}
          valueField={'id'}
        />
        <Input
          label={'How much space do you want?'}
          state={space}
          setState={setSpace}
          type={NUMBER}
        />
        {params.type == WAREHOUSE && (
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
              <Text style={styles.inputLabel}>
                Do you want to add storage type to this warehouse ?
              </Text>
              <View
                style={{
                  ...newOrderStyles.singleInfoContainer,
                  justifyContent: 'space-around',
                  marginVertical: SIZES.small,
                }}
              >
                <View>
                  <Checkbox
                    value={wantStorage}
                    color={COLORS.primary}
                    onValueChange={() => setWantStorage(!wantStorage)}
                  />
                  <Text>Yes</Text>
                </View>
                <View>
                  <Checkbox
                    value={!wantStorage}
                    color={COLORS.primary}
                    onValueChange={() => setWantStorage(!wantStorage)}
                  />
                  <Text>No</Text>
                </View>
              </View>
              {wantStorage && (
                <View style={newOrderStyles.listContainer}>
                  {warehouse?.warehousestoragemappings?.map((item) => {
                    return (
                      <View
                        key={item?.id}
                        style={newOrderStyles.resourceContainer}
                      >
                        <Text style={detailsStyles.name}>
                          {item?.warehouse_storage_type?.storage_name}
                        </Text>
                        <Text style={detailsStyles.type}>
                          <Text style={detailsStyles.label}>Space: </Text>
                          {item?.available_space + mSQUARE}
                        </Text>
                        <Text style={detailsStyles.type}>
                          <Text style={detailsStyles.label}>Height : </Text>
                          {item?.height + '' + item?.heightunit}
                        </Text>
                        <Text style={detailsStyles.type}>
                          <Text style={detailsStyles.label}>Temprature : </Text>
                          {item?.mintemp +
                            ' - ' +
                            item?.maxtemp +
                            ' ' +
                            item?.tempunit}
                        </Text>
                        <Text style={detailsStyles.type}>
                          <Text style={detailsStyles.label}>
                            Shelving Layout :{' '}
                          </Text>
                          Empty
                        </Text>
                        <Text style={detailsStyles.type}>
                          <Text style={detailsStyles.label}>
                            Price/{mSQUARE}:{' '}
                          </Text>
                          {item?.totalprice + ' Birr'}
                        </Text>
                        <Input
                          type={NUMBER}
                          label={'How much space do you want to use ?'}
                          state={storageSpace}
                          setState={setStorageSpace}
                        />
                        <View style={newOrderStyles.switchContainer}>
                          <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={
                              checkIfExists(item?.id) ? COLORS.blue : '#f4f3f4'
                            }
                            ios_backgroundColor='#3e3e3e'
                            onValueChange={
                              !checkIfExists(item?.id, STORAGE)
                                ? () =>
                                    setSelectedStroage([
                                      ...selectedStroage,
                                      item?.id,
                                    ])
                                : () =>
                                    setSelectedStroage((prev) =>
                                      prev.filter((id) => id != item?.id)
                                    )
                            }
                            value={checkIfExists(item?.id, STORAGE)}
                          />
                          <Text style={newOrderStyles.typeTitle(false)}>
                            Add {item?.warehouse_storage_type?.storage_name}
                          </Text>
                        </View>
                      </View>
                    )
                  })}
                </View>
              )}
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
                ? setStartDate(selectedDate.toLocaleDateString())
                : setEndDate(selectedDate.toLocaleDateString())
              setWhichToShow(null)
            }}
          />
        )}
        <Footer onCancel={() => {}} onSave={() => {}} />
      </View>
    </ScrollView>
  )
}

export default order
