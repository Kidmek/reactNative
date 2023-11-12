import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import {
  getManagedWarehouseDetails,
  getWarehouseDetails,
} from '../../api/warehouse/warehouse'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import MapView, { Marker } from 'react-native-maps'
import { selectIsFetching, setFetching } from '../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import Detail from '../../components/common/detail/Detail'
import Search from '../../components/common/search/Search'
import { DataTable } from 'react-native-paper'
import { WAREHOUSE, mSQUARE } from '../../constants/strings'

const warehouse = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [warehouse, setWarehouse] = useState()
  const [selectedImg, setSelectedImg] = useState(0)

  useEffect(() => {
    if (params?.type == 'Managed') {
      getManagedWarehouseDetails(params?.id, dispatch, setWarehouse, toast)
    } else {
      dispatch(setFetching(true))
      getWarehouseDetails(params?.id, dispatch, setWarehouse, toast)
    }
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      {warehouse && (
        <View style={styles.inputContainer}>
          {/* {params?.type == 'Unmanaged' && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('new', {
                  screen: 'resource',
                  params: {
                    id: warehouse.id,
                    name: warehouse.warehouse_name,
                  },
                })
              }}
              style={styles.headerBtn}
            >
              <AntDesign name='plus' size={20} color={'white'} />
              <Text style={styles.btnText}>New Resource</Text>
            </TouchableOpacity>
          )} */}
          <View style={styles.inputWrapper}>
            <Image
              style={styles.mainImage}
              source={{
                uri: warehouse?.warehouse_images
                  ? warehouse?.warehouse_images[selectedImg].images
                  : null,
              }}
            />
            <ScrollView horizontal>
              {warehouse?.warehouse_images?.map((image, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedImg(index)}
                  key={index}
                  style={styles.imagesWrapper}
                >
                  <Image style={styles.image} source={{ uri: image.images }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {params?.type == 'Unmanaged' ? (
            <>
              <View style={{ ...styles.header, marginBottom: 0 }}>
                <Text style={styles.headerTitle}>
                  {warehouse?.warehouse_name}
                </Text>
              </View>

              <View
                style={{
                  ...styles.resourcesHeader,
                  marginTop: 0,
                  paddingVertical: SIZES.small,
                  paddingBottom: SIZES.medium,
                }}
              >
                <TouchableOpacity
                  style={styles.orderBtn}
                  onPress={() => {
                    navigation.navigate('new', {
                      screen: 'order',
                      params: {
                        type: WAREHOUSE,
                        id: warehouse?.id,
                      },
                    })
                  }}
                >
                  <FontAwesome5 name='shopping-cart' size={30} color='white' />
                  <View>
                    <Text style={styles.headerBtnTxt}>Order</Text>
                    <Text style={styles.headerBtnTxt}>
                      {warehouse?.warehouse_name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orderBtn}>
                  <FontAwesome5 name='archive' size={30} color='white' />
                  <Text style={styles.headerBtnTxt}>Archive</Text>
                </TouchableOpacity>
              </View>

              <Detail label={'Region'} value={warehouse?.region} />
              <Detail label={'City'} value={warehouse.city} />
              <Detail label={'Sub City'} value={warehouse.sub_city} />
              <Detail label={'Zone'} value={warehouse.zone} />
              <Detail label={'Wereda'} value={warehouse.wereda} />
              <Detail
                label={'Warehouse Space'}
                value={warehouse.space}
                isSpace={true}
              />
              <Detail
                label={'Warehouse Price '}
                value={warehouse.full_price}
                isPrice={true}
              />
              <Detail
                label={'Warehouse Description'}
                value={warehouse.warehouse_meta}
              />
              {/*Storage Types , Office and Receptions */}

              {/* Storage Types */}
              <View>
                <View
                  style={{
                    ...styles.header,
                    marginBottom: 0,
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.headerTitle}>
                    {warehouse?.warehouse_name}
                  </Text>
                  <Text style={styles.detailLabel}>Storage Types</Text>
                </View>
                <TouchableOpacity style={{ ...styles.headerBtn, width: '80%' }}>
                  <AntDesign name='plus' size={25} color={'white'} />
                  <Text style={styles.headerBtnTxt}>Add Storage Type</Text>
                </TouchableOpacity>

                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title numeric>Space</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                    <DataTable.Title numeric>Action</DataTable.Title>
                  </DataTable.Header>

                  <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={(page) => {
                      console.log(page)
                    }}
                    label='1-2 of 6'
                  />
                </DataTable>
              </View>

              {/*  */}

              {/* Offices */}
              <View style={{ width: 'max-content' }}>
                <View
                  style={{
                    ...styles.header,
                    marginBottom: 0,
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.headerTitle}>
                    {warehouse?.warehouse_name}
                  </Text>
                  <Text style={styles.detailLabel}>Offices</Text>
                </View>
                <TouchableOpacity style={{ ...styles.headerBtn, width: '80%' }}>
                  <AntDesign name='plus' size={25} color={'white'} />
                  <Text style={styles.headerBtnTxt}>Add Office</Text>
                </TouchableOpacity>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                  <Search inner={true} />
                </View>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title numeric>Space</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                    <DataTable.Title numeric>Action</DataTable.Title>
                  </DataTable.Header>

                  {warehouse?.warehouseRecources?.map((warehouse, index) => {
                    const office = warehouse?.officeDetail
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>
                          <Text style={styles.tableBoldCell}>
                            {office.name}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          <Text style={styles.tableNormalCells}>
                            {office.space + ' ' + mSQUARE}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          <Text style={styles.tableNormalCells}>
                            {office.price + ' Birr'}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          <View style={styles.actionBtns}>
                            <TouchableOpacity>
                              <Text style={styles.detailsTextBtn}>Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text style={styles.detailsTextBtn}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text style={styles.removeTextBtn}>Remove</Text>
                            </TouchableOpacity>
                          </View>
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  })}

                  <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={(page) => {
                      console.log(page)
                    }}
                    label='1-2 of 6'
                  />
                </DataTable>
              </View>

              {/*  */}

              {/* HR */}
              <View style={{ width: 'max-content' }}>
                <View
                  style={{
                    ...styles.header,
                    marginBottom: 0,
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.headerTitle}>
                    {warehouse?.warehouse_name}
                  </Text>
                  <Text style={styles.detailLabel}>Human Resources</Text>
                </View>
                <TouchableOpacity style={{ ...styles.headerBtn, width: '80%' }}>
                  <AntDesign name='plus' size={25} color={'white'} />
                  <Text style={styles.headerBtnTxt}>Add Human Resources</Text>
                </TouchableOpacity>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                  <Search inner={true} />
                </View>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title>Phone Number</DataTable.Title>
                    <DataTable.Title>Salary</DataTable.Title>
                    <DataTable.Title numeric>Action</DataTable.Title>
                  </DataTable.Header>

                  {warehouse?.HumanResources?.map((resource, index) => {
                    const user = resource?.UserDetail
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>
                          <Text style={styles.tableBoldCell}>
                            {user.first_name}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text style={styles.tableNormalCells}>
                            {user.email}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text style={styles.tableNormalCells}>
                            {user.phone}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text style={styles.tableNormalCells}>
                            {user.salary + ' Birr'}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          <View style={styles.actionBtns}>
                            <TouchableOpacity>
                              <Text style={styles.detailsTextBtn}>Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text style={styles.detailsTextBtn}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text style={styles.removeTextBtn}>Remove</Text>
                            </TouchableOpacity>
                          </View>
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  })}

                  <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={(page) => {
                      console.log(page)
                    }}
                    label='1-2 of 6'
                  />
                </DataTable>
              </View>

              {/*  */}

              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: warehouse?.lat,
                  longitude: warehouse?.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  pinColor='red'
                  coordinate={{
                    latitude: warehouse?.lat,
                    longitude: warehouse?.lng,
                  }}
                />
              </MapView>
            </>
          ) : (
            params?.type == 'Managed' && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={
                      warehouse?.status === 'rented'
                        ? { color: 'green' }
                        : { color: 'black' }
                    }
                  >
                    Status: {warehouse?.status}
                  </Text>
                  <Text
                    style={
                      warehouse?.status === 'rented'
                        ? { color: 'green' }
                        : { color: 'black' }
                    }
                  >
                    Date: {warehouse?.created_at}
                  </Text>
                </View>
                <Detail
                  label={'Warehouse Name'}
                  value={warehouse?.warehouse_name}
                />

                <Detail label={'Region'} value={warehouse?.region} />
                <Detail label={'City'} value={warehouse.city} />
                <Detail label={'Sub City'} value={warehouse.sub_city} />
                <Detail label={'Zone'} value={warehouse.zone} />
                <Detail label={'Wereda'} value={warehouse.wereda} />
                <Detail label={'Warehouse Space'} value={warehouse.space} />
                <Detail
                  label={'Warehouse Price '}
                  value={warehouse.full_price}
                />
                <Detail
                  label={'Warehouse Description'}
                  value={warehouse.warehouse_meta}
                />
                {/* Office and Receptions */}
                {warehouse.storage && (
                  <View style={styles.storageContainer}>
                    <Text style={styles.detailLabel}>
                      Warehouse Storage Types
                    </Text>
                    {warehouse.storage?.map((storage, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            ...styles.officeContainer,
                            marginHorizontal: SIZES.xxSmall,
                          }}
                        >
                          <View style={styles.textContainer}>
                            <Text style={styles.name}>
                              {storage.storage_type?.storage_name}
                            </Text>

                            <Text style={styles.subName}>
                              {storage.storage_type?.storage_type_price +
                                ' Birr'}{' '}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                )}

                <MapView style={styles.map} />
              </>
            )
          )}
        </View>
      )}
    </ScrollView>
  )
}

export default warehouse
