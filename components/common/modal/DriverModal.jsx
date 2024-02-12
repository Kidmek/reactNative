import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import styles from './customModal.style'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { COLORS, SIZES } from '../../../constants'
import { Ionicons } from '@expo/vector-icons'
import CardDetail from '../detail/CardDetail'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MAP_KEY } from '../../../constants/strings'
const DriverModal = ({
  visible,
  setVisible,
  onSuccess,
  shipment,
  onCancel,
  location,
}) => {
  const { height, width } = Dimensions.get('screen')
  const [journey, setJourney] = useState()
  // console.log(
  //   Object.keys(shipment),
  //   shipment?.originlng,
  //   shipment?.originlat,
  //   shipment?.lng,
  //   shipment?.lat
  // )
  // console.log(new Date(shipment?.driver_accepted_time))
  // console.log(new Date(shipment?.driver_accepted_time?.toUpperCase()))
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        if (setVisible) {
          setVisible(false)
        }
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          //   margin: 0,
          //   padding: 0,
        }}
      >
        <View
          style={{
            ...styles.modalView,
            margin: 0,
            padding: 0,
            paddingBottom: SIZES.medium,
            alignItems: 'stretch',
            marginTop: height * 0.15,
            height: height,
          }}
        >
          <View style={styles.mapContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                position: 'absolute',
                zIndex: 100,
                right: 0,
                paddingRight: SIZES.small,
                paddingTop: SIZES.small,
              }}
            >
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  backgroundColor: '#fff',
                  borderColor: COLORS.grey,
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 4,
                }}
              >
                <Ionicons name='close-outline' size={22} />
              </TouchableOpacity>
            </View>
            {shipment &&
              shipment?.originlng &&
              shipment?.originlat &&
              shipment?.lng &&
              shipment?.lat && (
                <MapView
                  style={{
                    width: '100%',
                    height: height * 0.5,
                  }}
                  loadingEnabled
                  initialRegion={{
                    latitude: (shipment?.originlat + shipment?.lat) / 2,
                    longitude: (shipment?.originlng + shipment?.lng) / 2,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  {location?.coords?.longitude &&
                    location?.coords?.latitude && (
                      <Marker
                        title='Me'
                        description='My Location'
                        pinColor='blue'
                        coordinate={{
                          longitude: location?.coords?.longitude,
                          latitude: location?.coords?.latitude,
                        }}
                        // image={require('../../../assets/images/avatar.png')}
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

          <View style={styles.divider} />
          <ScrollView
            style={{
              flex: 1,
            }}
          >
            <View style={styles.info}>
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
                value={shipment?.fuel_consumption?.toFixed(3) + ' ltr'}
                status={COLORS.gray}
              />
              {/* <CardDetail
                label={'Accepted Time'}
                value={new Date(shipment?.driver_accepted_time)?.toUTCString()}
              /> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: SIZES.xxLarge,
                gap: SIZES.medium,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (setVisible) {
                    onCancel()
                    setVisible(false)
                  }
                }}
                style={[styles.declineBtn, styles.driverBtn]}
              >
                <Ionicons
                  name='close-outline'
                  size={SIZES.tabIcons}
                  color={COLORS.pureWhite}
                />

                <Text style={{ ...styles.textStyle, fontSize: SIZES.large }}>
                  Decline
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (onSuccess) {
                    onSuccess()
                    setVisible(false)
                  }
                }}
                style={[styles.acceptBtn, styles.driverBtn]}
              >
                <Ionicons
                  name='checkmark-outline'
                  size={SIZES.tabIcons}
                  color={COLORS.pureWhite}
                />

                <Text style={{ ...styles.textStyle, fontSize: SIZES.large }}>
                  Accept
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default DriverModal
