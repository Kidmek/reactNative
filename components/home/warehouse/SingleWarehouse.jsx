import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Share,
} from 'react-native'
import React, { useState } from 'react'

import styles from '../../common/styles/warehouse.style'
import innerStyles from '../../common/styles/withImages.style'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../../constants'
import { useNavigation } from 'expo-router'
import { useEffect, useLayoutEffect } from 'react'
import {
  getManagedWarehouseDetails,
  getWarehouseDetails,
} from '../../../api/warehouse/warehouse'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import MapView, { Marker } from 'react-native-maps'
import { selectIsFetching, setFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import Search from '../../../components/common/search/Search'
import { DataTable } from 'react-native-paper'
import { WAREHOUSE, mSQUARE } from '../../../constants/strings'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { defaultStyles } from '../../../components/common/styles/Styles'
import { currencyFormat } from '../../../components/common/utils'
import Carousel from 'react-native-reanimated-carousel'
import CardDetail from '../../common/detail/CardDetail'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

const SingleWarehouse = ({ params, wizard, setData }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [warehouse, setWarehouse] = useState()
  const scrollRef = useAnimatedRef()

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useLayoutEffect(() => {
    if (!wizard) {
      navigation.setOptions({
        headerTitle: '',
        headerTransparent: true,

        headerBackground: () => (
          <Animated.View
            style={[headerAnimatedStyle, innerStyles.header]}
          ></Animated.View>
        ),
        headerRight: () => (
          <View style={innerStyles.bar}>
            <TouchableOpacity
              style={innerStyles.roundButton}
              onPress={shareListing}
            >
              <Ionicons name='share-outline' size={22} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity style={innerStyles.roundButton}>
              <Ionicons name='heart-outline' size={22} color={'#000'} />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            style={innerStyles.roundButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='chevron-back' size={24} color={'#000'} />
          </TouchableOpacity>
        ),
      })
    }
  }, [])

  const scrollOffset = useScrollViewOffset(scrollRef)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    }
  }, [])

  useEffect(() => {
    // if (params?.type == 'Managed') {
    //   getManagedWarehouseDetails(params?.id, dispatch, setWarehouse, toast)
    // } else {
    dispatch(setFetching(true))
    getWarehouseDetails(params?.id, dispatch, setWarehouse, toast)
    // }
  }, [])

  useEffect(() => {
    if (warehouse && setData) {
      setData(warehouse)
    }
  }, [warehouse])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
      color={COLORS.primary}
    />
  ) : (
    <View style={innerStyles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: !wizard ? 100 : 0 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Carousel
          loop={false}
          height={IMG_HEIGHT}
          width={width}
          pagingEnabled={true}
          data={warehouse?.warehouse_images}
          onSnapToItem={(index) => {}}
          scrollAnimationDuration={1000}
          renderItem={({ item: image }) => (
            <Animated.Image
              source={{ uri: image?.images }}
              style={[innerStyles.image(IMG_HEIGHT, width), imageAnimatedStyle]}
              resizeMode='cover'
            />
          )}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />

        {!wizard ? (
          <View style={innerStyles.infoContainer}>
            <Text style={innerStyles.name}>{warehouse?.warehouse_name}</Text>
            <Text style={innerStyles.location}>
              {warehouse?.region},{warehouse?.city},{warehouse?.sub_city}
            </Text>
            <Text style={innerStyles.rooms}>
              {warehouse?.space} {mSQUARE}
            </Text>

            <View style={innerStyles.divider} />

            <Text style={innerStyles.description}>
              {warehouse?.warehouse_meta}
            </Text>

            <View style={innerStyles.divider} />

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
                <Text style={innerStyles.name}>Storage Types</Text>
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
                <Text style={innerStyles.name}>Offices</Text>
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
                        <Text style={styles.tableBoldCell}>{office.name}</Text>
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
                <Text style={innerStyles.name}>Human Resources</Text>
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

            {warehouse?.lat && warehouse?.lng && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: warehouse?.lat,
                  longitude: warehouse?.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation
              >
                <Marker
                  pinColor='red'
                  coordinate={{
                    latitude: warehouse?.lat,
                    longitude: warehouse?.lng,
                  }}
                />
              </MapView>
            )}
          </View>
        ) : (
          <View style={innerStyles.infoContainer}>
            <CardDetail label={'Region'} value={warehouse?.region} />
            <CardDetail label={'City'} value={warehouse?.city} />
            <CardDetail label={'Sub City'} value={warehouse?.sub_city} />
            <CardDetail label={'Zone'} value={warehouse?.zone} />
            <CardDetail label={'Wereda'} value={warehouse?.wereda} />
            <CardDetail
              label={'Price /' + mSQUARE}
              value={warehouse?.price_m2}
              isPrice
            />
            <CardDetail
              label={'Total Price'}
              value={warehouse?.full_price}
              isPrice
            />
            <CardDetail
              label={'Available Space'}
              value={warehouse?.available_space}
              isSpace
            />
            <CardDetail
              label={'Total Space'}
              value={warehouse?.storage_space}
              isSpace
            />
          </View>
        )}
      </Animated.ScrollView>

      {!wizard && (
        <Animated.View
          style={defaultStyles.footer}
          entering={SlideInDown.delay(200)}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity style={styles.footerText}>
              <Text style={styles.footerPrice}>
                {currencyFormat(warehouse?.full_price ?? 0)}
              </Text>
              <Text>Birr</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
              onPress={() => {
                navigation.navigate('new', {
                  screen: 'order',
                  params: { type: WAREHOUSE, id: warehouse.id, params },
                })
              }}
            >
              <Text style={defaultStyles.btnText}>Order</Text>
            </TouchableOpacity> */}
          </View>
        </Animated.View>
      )}
    </View>
  )
}

export default SingleWarehouse
