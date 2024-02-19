import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
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
import { defaultStyles } from '../../../components/common/styles/Styles'
import { currencyFormat } from '../../../components/common/utils'
import CardDetail from '../../common/detail/CardDetail'
import { getProductDetails } from '../../../api/product/product'

const SingleProduct = ({ params }) => {
  const dispatch = reduxStore.dispatch
  const fetching = useSelector(selectIsFetching)
  const isAdmin = useSelector(selectIsAdmin)
  const toast = useToast()
  const [product, setProduct] = useState()
  const [store, setStore] = useState()

  useEffect(() => {
    getProductDetails(params.id, dispatch, setProduct, toast)
  }, [])

  useEffect(() => {
    const found = product?.ProductsStored?.filter(
      (stored) => stored?.product === product?.id
    )
    if (found?.length) {
      setStore(found[0])
    }
  }, [product])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
      color={COLORS.primary}
    />
  ) : (
    <View style={innerStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <View style={innerStyles.infoContainer}>
          <Text style={innerStyles.name}>
            {product?.product_name}{' '}
            <Text style={innerStyles.location}>Product Information</Text>
          </Text>
          <Image
            source={{
              uri: product?.qr_code,
            }}
            style={{ width: 100, height: 100 }}
          />
          <View style={innerStyles.divider} />
          <CardDetail label={'Created At'} value={product?.created_at} />
          <CardDetail label={'Expire Date'} value={product?.expire_date} />
          <CardDetail
            label={'Product Type'}
            value={product?.ProductTypeDetail?.product_type_name}
          />
          <CardDetail
            label={'Category'}
            value={product?.catagorydetail?.category_name}
          />
          <CardDetail
            label={'Dimensions'}
            value={`Height : ${product?.height}\nLength : ${product?.length}\n Width : ${product?.width}`}
          />
          <CardDetail
            label={'Total Weight'}
            value={product?.weight + ' ' + product?.weightingUnit}
          />
          <CardDetail
            label={'Available Weight'}
            value={product?.available_weight + ' ' + product?.weightingUnit}
          />
          <CardDetail label={'Weight Per Unit'} value={product?.weight_unit} />
          <CardDetail
            label={'Performa Invoice'}
            value={product?.performa}
            download
          />
          <CardDetail label={'Total Quantity'} value={product?.quantity} />
          <CardDetail label={'Available Quantity'} value={product?.available} />
          <CardDetail
            label={'Price Per Unit'}
            value={product?.price_unit}
            isPrice
          />
          <CardDetail label={'Total Price'} value={product?.price} isPrice />
          <CardDetail label={'Status'} value={product?.status} />
          <CardDetail label={'SKU'} value={product?.sku} isSpace />
          <CardDetail label={'Bill Of Laiding'} value={product?.bol} download />

          <View style={innerStyles.divider} />

          <Text style={{ ...innerStyles.name, marginBottom: SIZES.medium }}>
            Product Storing Layout And Location
          </Text>
          <CardDetail
            label={'Product Warehouse'}
            value={store?.warehouseDetail?.warehouse_name}
            vertical
          />
          <CardDetail
            label={'Storage Type'}
            value={store?.storageDetail?.storagetypedetail?.storage_name}
            vertical
          />
          <CardDetail
            label={`Storage ${store?.storageDetail?.storagetypedetail?.storage_name} Available Space`}
            value={store?.storageDetail?.available_space}
            vertical
          />
          <CardDetail
            label={'Total Stored Quantity Weight'}
            value={store?.storedweight + ' ' + product?.weightingUnit}
            vertical
          />
          <CardDetail
            label={'Available Stored Quantity Weight'}
            value={store?.available_weight + ' ' + product?.weightingUnit}
            vertical
          />
          <CardDetail
            label={'Arrival Date'}
            value={store?.arrivaldate}
            vertical
          />

          {store?.warehouseDetail?.lat && store?.warehouseDetail?.lng && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: store?.warehouseDetail?.lat,
                longitude: store?.warehouseDetail?.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
            >
              <Marker
                pinColor='red'
                coordinate={{
                  latitude: store?.warehouseDetail?.lat,
                  longitude: store?.warehouseDetail?.lng,
                }}
              />
            </MapView>
          )}
        </View>
      </ScrollView>

      {isAdmin && (
        <Animated.View
          style={defaultStyles.footer}
          entering={SlideInDown.delay(200)}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: SIZES.small,
            }}
          >
            <TouchableOpacity
              style={[
                defaultStyles.btn,
                {
                  paddingHorizontal: SIZES.small,
                  backgroundColor: COLORS.secondary,
                },
              ]}
              onPress={() => {}}
            >
              <Text style={{ ...defaultStyles.btnText, fontSize: SIZES.small }}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[defaultStyles.btn, { paddingHorizontal: SIZES.small }]}
              onPress={() => {}}
            >
              <Text style={{ ...defaultStyles.btnText, fontSize: SIZES.small }}>
                Attach Files
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  )
}

export default SingleProduct
