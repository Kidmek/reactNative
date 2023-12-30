import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSingleShipment } from '../../../api/shipment/shipment'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import MapView, { Marker } from 'react-native-maps'
import CardDetail from '../../common/detail/CardDetail'
import { COLORS, SIZES } from '../../../constants'
import styles from '../../common/styles/warehouse.style'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import innerStyles from '../../common/styles/withImages.style'
import MapViewDirections from 'react-native-maps-directions'
import { currencyFormat } from '../../common/utils'
import Info from '../../common/cards/info/Info'
const SingleShipment = ({ params }) => {
  const { height } = Dimensions.get('screen')

  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [shipment, setShipment] = useState()
  useEffect(() => {
    getSingleShipment(params?.id, dispatch, setShipment, toast)
  }, [])
  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
      color={COLORS.primary}
    />
  ) : (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.pureWhite,
      }}
      contentContainerStyle={{
        ...innerStyles.infoContainer,
      }}
    >
      <View style={styles.inputWrapper}>
        {shipment &&
          shipment?.originlng &&
          shipment?.originlat &&
          shipment?.lng &&
          shipment?.lat && (
            <MapView
              style={{ ...styles.map, height: height * 0.3 }}
              initialRegion={{
                latitude: (shipment?.originlat + shipment?.lat) / 2,
                longitude: (shipment?.originlng + shipment?.lng) / 2,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                title='Origin'
                description='Starting Point'
                pinColor='blue'
                coordinate={{
                  latitude: shipment?.originlat,
                  longitude: shipment?.originlng,
                }}
              />
              <Marker
                title='Destination'
                description='Ending Point'
                pinColor='green'
                coordinate={{
                  latitude: shipment?.lat,
                  longitude: shipment?.lng,
                }}
              />
              <MapViewDirections
                origin={{
                  latitude: shipment?.originlat,
                  longitude: shipment?.originlng,
                }}
                destination={{
                  latitude: shipment?.lat,
                  longitude: shipment?.lng,
                }}
                apikey={'AIzaSyDonCBNomqhPAW1y06dY4fICo5YvqiLUwA'}
                strokeWidth={2.5}
                strokeColor='red'
              />
            </MapView>
          )}
      </View>
      <View style={innerStyles.divider} />
      <View>
        <View>
          <Text style={innerStyles.name}>
            {shipment?.shipmenttypedetail?.name}
          </Text>
          <Text style={innerStyles.description}>
            Date - {shipment?.created_at}
          </Text>
        </View>
        <View style={innerStyles.divider} />

        <View
          style={{
            gap: SIZES.small,
            display: 'flex',
          }}
        >
          <CardDetail
            label={'Status'}
            value={shipment?.status}
            status={COLORS.green}
          />
          <CardDetail
            label={'Product Weight'}
            value={shipment?.status}
            status={COLORS.green}
          />
          <CardDetail label={'Driver'} value={shipment?.status} />
          <CardDetail label={'Vehicle'} value={shipment?.vehicledetail?.type} />
          <CardDetail label={'Vehicle License Plate'} value={''} />
          <CardDetail
            label={'Shipment Distance'}
            value={parseFloat(shipment?.distance)?.toFixed(3) + ' Km'}
          />
          <CardDetail
            label={'Shipped Product'}
            value={shipment?.productdetail?.product_name}
          />
          <CardDetail
            label={'Total Shipped Quantity'}
            value={shipment?.productqty + ' From ' + shipment?.initialqty}
          />
          <CardDetail label={'Freight Charge / Kg'} value={''} />
          <CardDetail
            label={'Total Freight Charge'}
            value={shipment?.fraight_price}
            isPrice
          />
          <CardDetail label={'Distanse Charge / Km'} value={''} />
          <CardDetail
            label={'Total Distanse Charge'}
            value={parseFloat(shipment?.price)?.toFixed(2)}
            isPrice
          />
          <CardDetail
            label={'Total Shipment Charge'}
            value={
              currencyFormat(shipment?.totalprice) + ' Birr, Including VAT'
            }
          />
        </View>
        <Info text={'  waiting for to accept this shipment order.'} />
      </View>
    </ScrollView>
  )
}

export default SingleShipment
