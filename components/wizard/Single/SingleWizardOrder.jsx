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
import { COLORS, FONT, SIZES } from '../../../constants'
import { store as reduxStore } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import MapView, { Marker } from 'react-native-maps'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '../../../components/common/styles/Styles'
import CardDetail from '../../common/detail/CardDetail'
import { getSingleServiceOrders } from '../../../api/dashboard/wizard'
import CustomModal from '../../common/modal/CustomModal'

const SingleWizardOrder = ({ params }) => {
  const dispatch = reduxStore.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [order, setOrder] = useState()
  const [visible, setVisible] = useState(false)
  const [reason, setReason] = useState()
  useEffect(() => {
    getSingleServiceOrders(params?.id, dispatch, setOrder, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
      color={COLORS.primary}
    />
  ) : (
    <View style={innerStyles.container}>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        input={reason}
        setInput={setReason}
        onSuccess={() => {}}
        title={'Are you sure you want to decline this order?'}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <View style={{ marginHorizontal: SIZES.small, marginTop: SIZES.small }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SIZES.small,
              alignSelf: 'flex-end',
            }}
          >
            <Text
              style={{
                fontFamily: FONT.regular,
              }}
            >
              Status
            </Text>
            <View
              style={{
                backgroundColor: COLORS.lightBlue,
                borderRadius: SIZES.medium,
                paddingHorizontal: SIZES.small,
                paddingVertical: SIZES.xxSmall,
              }}
            >
              <Text>{order?.status}</Text>
            </View>
          </View>
          <Text style={innerStyles.name}>All Services Order Information</Text>
          <Text style={innerStyles.location}>
            Wizard order details and application.
          </Text>
        </View>
        <View style={innerStyles.infoContainer}>
          <Text style={innerStyles.name}>Product Information</Text>
          <View style={innerStyles.divider} />
          <CardDetail
            label={'Product Name'}
            value={order?.order?.product_name}
          />
          <CardDetail label={'SKU'} value={order?.order?.sku} isSpace />
          <CardDetail
            label={'Product Type'}
            value={order?.order?.product_type}
          />

          <CardDetail
            label={'Product Category'}
            value={order?.order?.category}
          />
          <CardDetail
            label={'Dimensions'}
            value={`Height : ${order?.order?.height}\nLength : ${order?.order?.length}\n Width : ${order?.order?.width}`}
          />
          <CardDetail
            label={'Product Quantity'}
            value={order?.order?.quantity}
          />
          <CardDetail
            label={'Product Weight Per Unit'}
            value={order?.order?.weight_unit + ' KG'}
          />
          <CardDetail
            label={'Total Product Weight'}
            value={order?.order?.weight + ' KG'}
          />
          <CardDetail
            label={'Product Price Per Unit'}
            value={order?.order?.price_unit}
            isPrice
          />
          <CardDetail
            label={'Total Product Price'}
            value={order?.order?.price}
            isPrice
          />

          <CardDetail
            label={'Performa Invoice'}
            value={order?.order?.performas}
            download
          />

          <CardDetail
            label={'Bill Of Laiding'}
            value={order?.order?.bols}
            download
          />

          <View style={innerStyles.divider} />

          <Text style={{ ...innerStyles.name, marginBottom: SIZES.medium }}>
            Space Order Information
          </Text>
          <CardDetail
            label={'Space Order Type'}
            value={order?.order?.order_type}
            vertical
          />
          <CardDetail
            label={'Storage Name'}
            value={order?.order?.mapped_warehouse}
            vertical
          />
          <CardDetail
            label={'Ordered Space'}
            value={order?.order?.space_to_rent}
            vertical
          />
          <CardDetail
            label={'Starting Date'}
            value={order?.order?.starting_date}
            vertical
          />
          <CardDetail
            label={'End Date'}
            value={order?.order?.end_date}
            vertical
          />
          <CardDetail
            label={'Total Day Difference'}
            value={order?.order?.remaining_date + ' days'}
            vertical
          />
          <View style={innerStyles.divider} />

          <Text style={{ ...innerStyles.name, marginBottom: SIZES.medium }}>
            Transportation Order Information
          </Text>

          <CardDetail
            label={'Transportation Type'}
            value={order?.order?.shipmenttype}
            vertical
          />
          <CardDetail
            label={'Vehicle'}
            value={order?.order?.vehicle}
            vertical
          />
          <CardDetail
            label={'Product Name'}
            value={order?.order?.product_name}
            vertical
          />
          <CardDetail
            label={'Product Quantity'}
            value={order?.order?.quantity}
            vertical
          />
          <CardDetail
            label={'Product Insurance'}
            value={order?.order?.buy_insurance ? 'Use System Insurance' : ''}
            vertical
          />
          <CardDetail
            label={'Performa Invoice'}
            value={order?.order?.performas}
            download
          />

          <CardDetail
            label={'Bill Of Laiding'}
            value={order?.order?.bols}
            download
          />
          <View style={innerStyles.divider} />
          <Text>Origin Address</Text>
          {order?.order?.originlat && order?.order?.originlng && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: order?.order?.originlat,
                longitude: order?.order?.originlng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                pinColor='red'
                coordinate={{
                  latitude: order?.order?.originlat,
                  longitude: order?.order?.originlng,
                }}
              />
            </MapView>
          )}
          <Text>Destination Address</Text>

          {order?.order?.lat && order?.order?.lng && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: order?.order?.lat,
                longitude: order?.order?.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                pinColor='red'
                coordinate={{
                  latitude: order?.order?.lat,
                  longitude: order?.order?.lng,
                }}
              />
            </MapView>
          )}
          <View style={innerStyles.divider} />

          <Text style={{ ...innerStyles.name, marginBottom: SIZES.medium }}>
            Customes Clearance Order Information
          </Text>

          <CardDetail
            label={'Customes Clearance Transit Agent'}
            value={order?.order?.transitor}
            vertical
          />
          <CardDetail
            label={'Customes Clearance Transit Port'}
            value={order?.order?.port_name}
            vertical
          />
          <View style={innerStyles.divider} />
          <CardDetail
            label={'Initialized Date'}
            value={order?.created_at}
            vertical
          />
        </View>
      </ScrollView>

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
                backgroundColor: COLORS.lightBlue,
              },
            ]}
            onPress={() => {}}
          >
            <Text style={{ ...defaultStyles.btnText, fontSize: SIZES.small }}>
              Edit Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              defaultStyles.btn,
              { paddingHorizontal: SIZES.small, backgroundColor: COLORS.red },
            ]}
            onPress={() => {
              setVisible(true)
            }}
          >
            <Text style={{ ...defaultStyles.btnText, fontSize: SIZES.small }}>
              Cancel Order
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

export default SingleWizardOrder
