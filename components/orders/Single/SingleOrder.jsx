import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import styles from '../../common/styles/warehouse.style'
import innerStyles from '../../common/styles/withImages.style'
import { COLORS, SIZES } from '../../../constants'
import { store as reduxStore } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import MapView, { Marker } from 'react-native-maps'
import {
  selectIsAdmin,
  selectIsFetching,
} from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { defaultStyles } from '../../common/styles/Styles'
import { currencyFormat, makeCSV } from '../../common/utils'
import CardDetail from '../../common/detail/CardDetail'
import { getOrderDetails } from '../../../api/order/order'
import { mSQUARE } from '../../../constants/strings'
import Carousel from 'react-native-reanimated-carousel'
import { useNavigation } from 'expo-router'
import SingleCard from '../../common/cards/single/SingleCard'
import StorageTypeCard from './StorageTypeCard'
import OfficeCard from './OfficeCard'
import HRCard from './HRCard'

const SingleOrder = ({ params }) => {
  const { width } = Dimensions.get('window')
  const IMG_HEIGHT = 300
  const dispatch = reduxStore.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [order, setOrder] = useState()
  const scrollRef = useAnimatedRef()
  const navigation = useNavigation()

  useLayoutEffect(() => {
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
            onPress={() => {
              const data = [
                { name: 'John', email: 'john@example.com' },
                { name: 'Jane', email: 'jane@example.com' },
              ]
              makeCSV(
                `[
                  {
                      "Column 1": "Name",
                      "Column 2": "Surname",
                      "Column 3": "Email",
                      "Column 4": "Info"
                  }
                ]`,
                toast
              )
            }}
          >
            <Ionicons name='download-outline' size={22} color={'#000'} />
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
    getOrderDetails(params.id, dispatch, setOrder, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
      color={COLORS.primary}
    />
  ) : (
    <View style={innerStyles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Carousel
          loop={true}
          height={IMG_HEIGHT}
          width={width}
          pagingEnabled={true}
          data={
            order?.OrderTypeDetail?.ordertype_name == 'Storages'
              ? order?.storageorderdetail?.StorageTypeDetail?.images
              : order?.warehousedetail?.images
          }
          scrollAnimationDuration={1000}
          autoPlayInterval={2500}
          renderItem={({ item: image }) => (
            <Animated.Image
              source={{ uri: image?.image }}
              style={[innerStyles.image(IMG_HEIGHT, width), imageAnimatedStyle]}
              resizeMode='cover'
            />
          )}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
        <View style={innerStyles.infoContainer}>
          <Text style={innerStyles.name}>
            {order?.OrderTypeDetail?.ordertype_name}{' '}
            <Text style={innerStyles.location}>Order</Text>
          </Text>
          <Text>Date-{order?.created_at}</Text>

          <View style={innerStyles.divider} />
          <CardDetail
            label={'Status'}
            value={order?.status}
            status={COLORS.blue}
          />
          <CardDetail
            label={
              order?.OrderTypeDetail?.ordertype_name == 'Storages'
                ? 'Storage Name'
                : 'Warehouse Name'
            }
            value={
              order?.OrderTypeDetail?.ordertype_name == 'Storages'
                ? order?.storageorderdetail?.StorageTypeDetail?.storage_name
                : order?.warehousedetail?.warehouse_name
            }
          />

          <CardDetail label={'Start Date'} value={order?.starting_date} />
          <CardDetail label={'End Date'} value={order?.end_date} />
          <CardDetail
            label={'Price /' + mSQUARE}
            value={
              order?.OrderTypeDetail?.ordertype_name == 'Storages'
                ? 0
                : order?.warehousedetail?.price_m2 ?? '0'
            }
            isPrice={true}
          />
          <CardDetail
            label={'Space To Rent'}
            value={order?.space_to_rent ?? '0'}
            isSpace={true}
          />
          <CardDetail
            label={'Time Duration'}
            value={order?.remaining_date + ' Days'}
          />
          {order?.OrderTypeDetail?.ordertype_name == 'Storages' && (
            <View>
              <CardDetail
                label={'Storage Height'}
                value={
                  order?.storageorderdetail?.height +
                  ' ' +
                  order?.storageorderdetail?.heightunit
                }
              />
              <CardDetail
                label={'Storage Terminal'}
                value={order?.storageorderdetail?.terminal}
              />
              <CardDetail
                label={'Storage Temperature'}
                value={
                  order?.storageorderdetail?.mintemp +
                  '-' +
                  order?.storageorderdetail?.mintemp +
                  ' ' +
                  order?.storageorderdetail?.tempunit
                }
              />
            </View>
          )}
          <CardDetail label={'Region'} value={order?.warehousedetail?.region} />
          <CardDetail label={'City'} value={order?.warehousedetail?.city} />
          <CardDetail
            label={'Subcity'}
            value={order?.warehousedetail?.sub_city}
          />
          <CardDetail label={'Zone'} value={order?.warehousedetail?.zone} />
          <CardDetail label={'Wereda'} value={order?.warehousedetail?.wereda} />
        </View>
        <View style={innerStyles.divider} />
        {order?.rentedspacedetail?.length > 0 && (
          <View>
            <Text
              style={{
                ...innerStyles.name,
                textAlign: 'center',
                marginBottom: SIZES.xLarge,
              }}
            >
              Storage Types
            </Text>
            {order?.rentedspacedetail?.map((item, index) => {
              return <StorageTypeCard item={item} key={index} width={width} />
            })}
            <View style={innerStyles.divider} />
          </View>
        )}

        {order?.Offices?.length > 0 && (
          <View>
            <Text
              style={{
                ...innerStyles.name,
                textAlign: 'center',
                marginBottom: SIZES.small,
              }}
            >
              Offices
            </Text>
            {order?.Offices?.map((item, index) => {
              return <OfficeCard item={item} key={index} width={width} />
            })}
            <View style={innerStyles.divider} />
          </View>
        )}

        {order?.HumanResources?.length > 0 && (
          <View>
            <Text
              style={{
                ...innerStyles.name,
                textAlign: 'center',
                marginBottom: SIZES.small,
              }}
            >
              Human Resources
            </Text>
            <View style={{ paddingHorizontal: SIZES.xxLarge }}>
              {order?.HumanResources?.map((item, index) => {
                return <HRCard item={item} key={index} />
              })}
            </View>
            <View style={innerStyles.divider} />
          </View>
        )}

        {order?.warehousedetail?.lat && order?.warehousedetail?.lng && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: order?.warehousedetail?.lat,
              longitude: order?.warehousedetail?.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation
          >
            <Marker
              pinColor='red'
              coordinate={{
                latitude: order?.warehousedetail?.lat,
                longitude: order?.warehousedetail?.lng,
              }}
            />
          </MapView>
        )}
      </Animated.ScrollView>
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
          <TouchableOpacity style={innerStyles.footerText}>
            <Text style={innerStyles.footerPrice}>
              {currencyFormat(order?.totalprice ?? 0)}
            </Text>
            <Text>Birr</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              defaultStyles.btn,
              {
                paddingRight: 20,
                paddingLeft: 20,
                flexDirection: 'row',
                gap: SIZES.small,
              },
            ]}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'payment',
                params: { id: order.id },
              })
            }}
          >
            <Ionicons name='receipt-outline' size={22} color={'#fff'} />
            <Text style={defaultStyles.btnText}>Invoice</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

export default SingleOrder
