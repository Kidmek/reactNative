import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  deleteSingleShipment,
  getDrivers,
  getSingleShipment,
  updateSingleShipment,
} from '../../../api/shipment/shipment'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import MapView, { Marker } from 'react-native-maps'
import CardDetail from '../../common/detail/CardDetail'
import { COLORS, FONT, SIZES } from '../../../constants'
import styles from '../../common/styles/warehouse.style'
import { useSelector } from 'react-redux'
import { selectData, selectIsFetching } from '../../../features/data/dataSlice'
import innerStyles from '../../common/styles/withImages.style'
import MapViewDirections from 'react-native-maps-directions'
import { currencyFormat } from '../../common/utils'
import Info from '../../common/cards/info/Info'
import SingleDriver from './SingleDriver'
import Footer from '../../common/footer/Footer'
import { Feather } from '@expo/vector-icons'

import CustomModal from '../../common/modal/CustomModal'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import {
  ACCEPTED,
  DRIVERS,
  INITIALIZED,
  MAP_KEY,
} from '../../../constants/strings'
import Input from '../../common/input/Input'
import AddNew from '../../common/header/AddNew'

const SingleShipment = ({ params }) => {
  const { height } = Dimensions.get('screen')
  const [visible, setVisible] = useState(false)
  const [reason, setReason] = useState()
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [shipment, setShipment] = useState()
  const [journey, setJourney] = useState()
  const [fields, setFields] = useState([])

  const [location, setLocation] = useState()
  const user = useSelector(selectData)

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      toast.show('Permission to access location was denied')
      return
    }

    let location = await Location.getLastKnownPositionAsync({})
    setLocation(location)
  }
  const onAdd = (accept) => {
    updateSingleShipment(
      params?.id,
      {
        paid: false,
        accepted: accept,
        declined: !accept,
        completed: false,
        confirmed: false,
        declined_reason: !accept ? reason : '',
        dynamicInputs: fields,
        id: params?.id,
        shipmenttype: shipment?.shipmenttypedetail?.id,
        fraight_price: shipment?.fraight_price,
        totalprice: shipment?.totalprice,
        currentLocation: {
          lat: location?.coords?.longitude,
          lng: location?.coords?.latitude,
        },
      },
      dispatch,
      () => {
        router.back()
      },
      toast
    )
  }
  const onDelete = () => {
    deleteSingleShipment(
      params?.id,

      dispatch,
      () => {
        router.back()
      },
      toast
    )
  }

  useEffect(() => {
    if (params?.id) {
      getSingleShipment(params?.id, dispatch, setShipment, toast)
    }
    fetchCurrentLocation()
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
        padding: 0,
      }}
    >
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        input={reason}
        setInput={setReason}
        onSuccess={() => {
          onAdd(false)
        }}
      />
      <View style={styles.inputWrapper}>
        {shipment &&
          shipment?.originlng &&
          shipment?.originlat &&
          shipment?.lng &&
          shipment?.lat && (
            <MapView
              style={{ ...styles.map, height: height * 0.5 }}
              initialRegion={{
                latitude: (shipment?.originlat + shipment?.lat) / 2,
                longitude: (shipment?.originlng + shipment?.lng) / 2,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
            >
              {location?.coords?.longitude && location?.coords?.latitude && (
                <Marker
                  title='Me'
                  description='My Location'
                  pinColor='blue'
                  coordinate={{
                    longitude: location?.coords?.longitude,
                    latitude: location?.coords?.latitude,
                  }}
                />
              )}
              <Marker
                title='Origin'
                description='Starting Point'
                pinColor='red'
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
                apikey={MAP_KEY}
                strokeWidth={2.5}
                strokeColor='red'
                onReady={(e) => {
                  let hour,
                    min,
                    duration = ''
                  if (e?.duration > 59) {
                    hour = Math.floor(e?.duration / 60)
                  }
                  min = Math.ceil(e?.duration % 60)
                  if (hour) {
                    duration += hour + ' Hour '
                  }
                  if (min) {
                    duration += min + ' Min'
                  }
                  setJourney({
                    distance: e?.distance,
                    duration,
                  })
                }}
              />
            </MapView>
          )}
      </View>

      <View
        style={{
          padding: SIZES.medium,
        }}
      >
        <View
          style={{
            paddingHorizontal: SIZES.medium,
          }}
        >
          <View>
            <Text style={{ ...innerStyles.name, fontFamily: FONT.bold }}>
              Assigned Driver
            </Text>
            <View style={innerStyles.divider} />
            {shipment?.vehicledetail?.driver?.email && (
              <SingleDriver
                driver={shipment?.vehicledetail?.driver}
                licenseplate={shipment?.vehicledetail?.licenseplate}
              />
            )}
          </View>
          <View>
            <Text style={{ ...innerStyles.name, fontFamily: FONT.bold }}>
              Journey Details
            </Text>
            <View style={innerStyles.divider} />

            <CardDetail
              label={'Total Distance'}
              value={
                (journey?.distance ??
                  parseFloat(shipment?.distance)?.toFixed(3)) + ' Km'
              }
              status={COLORS.gray}
            />
            <CardDetail
              label={'Full Time Duration'}
              value={journey?.duration ? journey?.duration : 'Unkown'}
              status={COLORS.gray}
            />
            <CardDetail
              label={'Fuel Consumption'}
              value={
                shipment?.fuel_consumption
                  ? shipment?.fuel_consumption?.toFixed(3) + ' ltr'
                  : 'Unkown '
              }
              status={COLORS.gray}
            />
            <CardDetail
              label={'Accepted Time'}
              value={new Date(shipment?.driver_accepted_time)?.toUTCString()}
            />
            {/* <View style={innerStyles.divider} />
          {drivers?.results?.map((driver) => {
            return <SingleDriver key={driver?.id} driver={driver} />
          })} */}
          </View>
        </View>
        <View style={innerStyles.divider} />
        <View style={{ marginBottom: SIZES.small }}>
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
              value={(shipment?.weight ?? '') + ' KG'}
              status={COLORS.green}
            />
            <CardDetail
              label={'Driver'}
              value={shipment?.vehicledetail?.driver?.first_name}
            />
            <CardDetail
              label={'Vehicle'}
              value={shipment?.vehicledetail?.type}
            />
            {/* <CardDetail
              label={'Vehicle License Plate'}
              value={shipment?.vehicledetail?.licenseplate}
            /> */}
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
            <CardDetail
              label={'Freight Charge / Kg'}
              value={shipment?.vehicledetail?.driver?.price_kg}
              isPrice
            />
            <CardDetail
              label={'Total Freight Charge'}
              value={shipment?.fraight_price}
              isPrice
            />
            <CardDetail
              label={'Distanse Charge / Km'}
              value={shipment?.vehicledetail?.driver?.price_km}
              isPrice
            />
            <CardDetail
              label={'Total Distanse Charge'}
              value={parseFloat(shipment?.price)?.toFixed(2)}
              isPrice
            />
            <CardDetail
              label={'Total Shipment Charge'}
              value={
                (currencyFormat(shipment?.totalprice) ?? '') +
                ' Birr, Including VAT'
              }
            />
          </View>
          {/* <Info text={'  waiting for to accept this shipment order.'} /> */}
        </View>

        {user?.groupdetail?.name?.toLowerCase() === DRIVERS &&
          shipment?.status?.toLowerCase() === INITIALIZED && (
            <View>
              {fields?.map((field, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: SIZES.small,
                    }}
                  >
                    <Input
                      style={{
                        flex: 1,
                      }}
                      labelState={field?.label}
                      setLabelState={(value) => {
                        const prev = fields

                        prev[index] = { ...field, label: value }
                        setFields([...prev])
                      }}
                      state={field?.value}
                      setState={(value) => {
                        const prev = fields

                        prev[index] = { ...field, value: value }
                        setFields([...prev])
                      }}
                    />
                    <Pressable
                      onPress={() => {
                        let prev = fields
                        prev = prev.filter((_, prevIndex) => {
                          return prevIndex !== index
                        })
                        setFields([...prev])
                      }}
                    >
                      <Feather
                        name='trash'
                        color={'red'}
                        size={SIZES.xxLarge}
                      />
                    </Pressable>
                  </View>
                )
              })}

              <AddNew
                title={'Add Transportation Costs'}
                onPress={() => {
                  setFields([
                    ...fields,
                    {
                      label: 'Label ' + parseInt(fields.length) + 1,
                      value: '',
                      type: '',
                    },
                  ])
                }}
              />
              <View style={innerStyles.divider} />

              <Footer
                onSave={() => {
                  onAdd(true)
                }}
                onCancel={() => {
                  setVisible(true)
                }}
                saveText={'Accept'}
                cancelText={'Decline'}
              />
            </View>
          )}
        {user?.groupdetail?.name?.toLowerCase() === DRIVERS &&
          shipment?.status?.toLowerCase() === ACCEPTED && (
            <Footer
              onSave={() => {
                //
              }}
              start
              saveText={'Start'}
            />
          )}
      </View>
    </ScrollView>
  )
}

export default SingleShipment
