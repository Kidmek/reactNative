import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Pressable,
  RefreshControl,
} from 'react-native'
import React, { useState, useEffect } from 'react'

import styles from '../../common/styles/warehouse.style'
import innerStyles from '../../common/styles/withImages.style'
import { COLORS, FONT, SIZES } from '../../../constants'
import { store as reduxStore } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import CardDetail from '../../common/detail/CardDetail'
import { getOrderDetails, orderPayment } from '../../../api/order/order'
import { mSQUARE } from '../../../constants/strings'
import { currencyFormat } from '../../common/utils'
import { defaultStyles } from '../../common/styles/Styles'
import { useFocusEffect, useNavigation } from 'expo-router'

const SinglePayment = ({ params }) => {
  const dispatch = reduxStore.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [order, setOrder] = useState()
  const [refresh, setRefresh] = useState()
  const [paymentInitiated, setPaymentInitiated] = useState(false)
  const navigation = useNavigation()

  const onConfirm = () => {
    orderPayment(
      {
        amount: order?.totalprice,
        id: params.id,
      },
      dispatch,
      () => {
        getOrderDetails(params.id, dispatch, setOrder, toast)
      },
      toast
    )
  }

  useEffect(() => {
    getOrderDetails(params.id, dispatch, setOrder, toast)
  }, [refresh])

  // useEffect(() => {
  //   const found = order?.ProductsStored?.filter(
  //     (stored) => stored?.order === order?.id
  //   )
  //   if (found?.length) {
  //     setStore(found[0])
  //   }
  // }, [order])
  useFocusEffect(() => {
    if (paymentInitiated) {
      setRefresh(!refresh)
      setPaymentInitiated(false)
    }
  })

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={SIZES.xxLarge}
      color={COLORS.primary}
    />
  ) : (
    <View style={innerStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 0 }}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={() => setRefresh(!refresh)}
          />
        }
      >
        <View style={innerStyles.infoContainer}>
          <Text style={innerStyles.name}>Invoice Information</Text>

          <View style={innerStyles.divider} />
          <CardDetail
            label={'Status'}
            value={order?.status}
            status={COLORS.blue}
          />
          <CardDetail
            label={order?.OrderTypeDetail?.ordertype_name}
            value={
              order?.storageorderdetail
                ? order?.storageorderdetail?.StorageTypeDetail?.storage_name
                : order?.warehousedetail?.warehouse_name
            }
          />

          <CardDetail
            label={'Space To Rent'}
            value={order?.space_to_rent}
            isSpace
          />

          <CardDetail
            label={'Price/' + mSQUARE}
            value={
              order?.storageorderdetail
                ? order?.storageorderdetail?.price_m2
                : order?.warehousedetail?.price_m2
            }
            isPrice
          />
          <CardDetail label={'Price/Day'} value={order?.price} isPrice />

          <CardDetail
            label={'Time Duration'}
            value={order?.remaining_date + ' Days'}
          />
          <CardDetail label={'VAT'} value={'15%'} />
          <View style={innerStyles.divider} />

          <CardDetail
            label={'Total Price'}
            value={currencyFormat(order?.totalprice ?? 0)}
            isPrice={true}
          />
          <View style={innerStyles.divider} />
        </View>
        {order?.checkoutdata && (
          <View style={innerStyles.infoContainer}>
            <Text style={innerStyles.name}>Payment Information</Text>

            <View style={innerStyles.divider} />
            {order?.paymentdata ? (
              <View>
                <CardDetail
                  label={'Status'}
                  value={order?.paymentdata?.status}
                  status={COLORS.blue}
                />
                <CardDetail
                  label={'Amount'}
                  value={order?.paymentdata?.data?.amount}
                  status={COLORS.blue}
                />
                <CardDetail
                  label={'Charge'}
                  value={order?.paymentdata?.data?.charge}
                  status={COLORS.blue}
                />
                <CardDetail
                  label={'Method'}
                  value={order?.paymentdata?.data?.method}
                  status={COLORS.blue}
                />
                <CardDetail
                  label={'Reference'}
                  value={order?.paymentdata?.data?.reference}
                  status={COLORS.blue}
                />
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  if (order?.checkoutdata?.data?.checkout_url) {
                    setPaymentInitiated(true)
                    navigation.navigate('details', {
                      screen: 'chapa',
                      params: { url: order?.checkoutdata?.data?.checkout_url },
                    })
                  }
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    textDecorationLine: 'underline',
                    fontFamily: FONT.bold,
                  }}
                >
                  Click Here To Checkout
                </Text>
              </Pressable>
            )}
            <View style={innerStyles.divider} />
          </View>
        )}
      </ScrollView>
      {!order?.checkoutdata && (
        <View style={{ ...defaultStyles.footer, height: 'auto' }}>
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
              style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
              onPress={() => {
                onConfirm()
              }}
            >
              <Text style={defaultStyles.btnText}>Confirm And Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

export default SinglePayment
