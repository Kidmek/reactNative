import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'

import styles from '../../common/styles/warehouse.style'
import innerStyles from '../../common/styles/withImages.style'
import { COLORS, SIZES } from '../../../constants'
import { store as reduxStore } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
// import MapView, { Marker } from 'react-native-maps'
import {
  selectIsAdmin,
  selectIsFetching,
} from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '../../../components/common/styles/Styles'
import CardDetail from '../../common/detail/CardDetail'
import { getProductDetails } from '../../../api/product/product'
import { useNavigation } from 'expo-router'

const SingleProduct = ({ params }) => {
  const dispatch = reduxStore.dispatch
  const fetching = useSelector(selectIsFetching)
  const isAdmin = useSelector(selectIsAdmin)
  const toast = useToast()
  const [product, setProduct] = useState()
  // const [store, setStore] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    if (!product) getProductDetails(params.id, dispatch, setProduct, toast)
  }, [])

  // useEffect(() => {
  //   const found = product?.ProductsStored?.filter(
  //     (stored) => stored?.product === product?.id
  //   )
  //   if (found?.length) {
  //     setStore(found[0])
  //   }
  // }, [product])

  useLayoutEffect(() => {
    if (product) {
      navigation.setOptions({
        headerTitle: product?.product_name,
      })
    }
  }, [product])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={SIZES.xxLarge}
      color={COLORS.primary}
    />
  ) : (
    <View style={innerStyles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: isAdmin ? SIZES.mediumPicture : SIZES.medium,
        }}
        // scrollEventThrottle={16}
      >
        <View
          style={{
            ...innerStyles.infoContainer,
            padding: SIZES.small,
            gap: SIZES.medium,
          }}
        >
          <View
            style={{
              ...styles.onlyTextContainer,
              padding: SIZES.small,
            }}
          >
            <CardDetail
              label={'Product Type'}
              value={product?.ProductTypeDetail?.product_type_name}
              underline
            />
            <CardDetail
              label={'Category'}
              value={product?.catagorydetail?.category_name}
              underline
            />
            <CardDetail label={'Status'} value={product?.status} underline />
            <CardDetail
              label={'Created At'}
              value={product?.created_at}
              underline
            />
            <CardDetail
              label={'Expire Date'}
              value={product?.expire_date}
              underline
            />
          </View>

          <View
            style={{
              ...styles.onlyTextContainer,
              padding: SIZES.small,
            }}
          >
            <CardDetail
              label={'Dimensions'}
              value={`Height : ${product?.height}\nLength : ${product?.length}\n Width : ${product?.width}`}
              underline
            />
            <CardDetail
              label={'Total Weight'}
              value={product?.weight + ' ' + product?.weightingUnit}
              underline
            />
            <CardDetail
              label={'Available Weight'}
              value={product?.available_weight + ' ' + product?.weightingUnit}
              underline
            />
            <CardDetail
              label={'Weight Per Unit'}
              value={product?.weight_unit + ' ' + product?.weightingUnit}
              underline
            />
            <CardDetail
              label={'Total Quantity'}
              value={product?.quantity}
              underline
            />
            <CardDetail
              label={'Available Quantity'}
              value={product?.available}
              underline
            />
            <CardDetail
              label={'Price Per Unit'}
              value={product?.price_unit}
              isPrice
              underline
            />
            <CardDetail
              label={'Total Price'}
              value={product?.price}
              isPrice
              underline
            />

            <CardDetail label={'SKU'} value={product?.sku} isSpace underline />
          </View>

          {(product?.clearance ||
            product?.bol ||
            product?.insurance ||
            product?.performa) && (
            <View
              style={{
                ...styles.onlyTextContainer,
                padding: SIZES.small,
              }}
            >
              {product?.bol && (
                <CardDetail
                  label={'Bill Of Laiding'}
                  value={product.bol}
                  download
                />
              )}
              {product?.clearance && (
                <CardDetail
                  label={'Performa Clearance'}
                  value={product.clearance}
                  download
                />
              )}
              {produc?.insurance && (
                <CardDetail
                  label={'Performa Insurance'}
                  value={product.insurance}
                  download
                />
              )}
              {product?.performa && (
                <CardDetail
                  label={'Performa Invoice'}
                  value={product.performa}
                  download
                />
              )}
            </View>
          )}
          <View
            style={{
              ...styles.onlyTextContainer,
              width: 200,
              alignSelf: 'center',
            }}
          >
            <Image
              source={{
                uri: product?.qr_code,
              }}
              style={{ width: 200, height: 200 }}
            />
          </View>

          {/* <View style={innerStyles.divider} /> */}

          {/* <Text style={{ ...innerStyles.name, marginBottom: SIZES.medium }}>
            Product Storing Layout And Location
          </Text> */}
          {/* <CardDetail
            label={'Product Warehouse'}
            value={store?.warehouseDetail?.warehouse_name}
            vertical
          /> */}
          {/* <CardDetail
            label={'Storage Type'}
            value={store?.storageDetail?.storagetypedetail?.storage_name}
            vertical
          />
          <CardDetail
            label={`Storage ${store?.storageDetail?.storagetypedetail?.storage_name} Available Space`}
            value={store?.storageDetail?.available_space}
            vertical
          /> */}
          {/* <CardDetail
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
          /> */}

          {/* {store?.warehouseDetail?.lat && store?.warehouseDetail?.lng && (
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
          )} */}
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
