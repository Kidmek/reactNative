import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native'
import React, { useState, useEffect } from 'react'

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
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '../../common/styles/Styles'
import { currencyFormat } from '../../common/utils'
import CardDetail from '../../common/detail/CardDetail'
import { getProductDetails } from '../../../api/order/order'
import { getOrderDetails } from '../../../api/order/order'
import { mSQUARE } from '../../../constants/strings'
import Carousel from 'react-native-reanimated-carousel'

const SingleOrder = ({ params }) => {
  const { width } = Dimensions.get('window')
  const IMG_HEIGHT = 300
  const dispatch = reduxStore.dispatch
  const fetching = useSelector(selectIsFetching)
  const isAdmin = useSelector(selectIsAdmin)
  const toast = useToast()
  const [order, setOrder] = useState()
  const [store, setStore] = useState()

  useEffect(() => {
    getOrderDetails(params.id, dispatch, setOrder, toast)
  }, [])
  useEffect(() => {
    const found = order?.ProductsStored?.filter(
      (stored) => stored?.order === order?.id
    )
    if (found?.length) {
      setStore(found[0])
    }
  }, [order])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
      color={COLORS.primary}
    />
  ) : (
    <View style={innerStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 0 }}
        scrollEventThrottle={16}
      >
        {/* <Carousel
          loop={false}
          height={IMG_HEIGHT}
          width={width}
          pagingEnabled={true}
          data={
            order?.OrderTypeDetail?.ordertype_name == 'Storages'
              ? order?.storageorderdetail?.StorageTypeDetail?.images
              : order?.warehousedetail?.images
          }
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
        /> */}
        <View style={innerStyles.infoContainer}>
          <Text style={innerStyles.name}>
            {order?.OrderTypeDetail?.ordertype_name}{' '}
            <Text style={innerStyles.location}>Order</Text>
          </Text>

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
          <View style={innerStyles.divider} />
        </View>
        {order?.warehousedetail?.lat && order?.warehousedetail?.lng && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: order?.warehousedetail?.lat,
              longitude: order?.warehousedetail?.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
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
      </ScrollView>
    </View>
  )
}

export default SingleOrder
