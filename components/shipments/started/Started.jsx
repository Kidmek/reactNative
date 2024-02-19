import { Vibration, View } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import {
  getShipments,
  updateSingleShipment,
} from '../../../api/shipment/shipment'
import CardDetail from '../../common/detail/CardDetail'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import { useSelector } from 'react-redux'
import { selectData } from '../../../features/data/dataSlice'
import Footer from '../../common/footer/Footer'
import { ACCEPTED, DRIVERS, INITIALIZED } from '../../../constants/strings'
import * as Location from 'expo-location'
import CustomModal from '../../common/modal/CustomModal'
import DriverModal from '../../common/modal/DriverModal'
import { Audio } from 'expo-av'
import * as Notifications from 'expo-notifications'
import { useNavigation } from 'expo-router'

const Started = ({ fetching, type, refresh, cantAdd }) => {
  const ONE_SECOND_IN_MS = 1000
  const navigation = useNavigation()
  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ]
  const dispatch = store.dispatch
  const toast = useToast()
  const user = useSelector(selectData)
  const [reason, setReason] = useState()
  const [shipments, setShipments] = useState()
  const [shipment, setShipment] = useState()
  const [location, setLocation] = useState()
  const [visible, setVisible] = useState(false)
  const [newVisible, setNewVisible] = useState(false)
  const [sound, setSound] = useState()

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
      shipment?.id,
      {
        paid: false,
        accepted: accept,
        declined: !accept,
        completed: false,
        confirmed: false,
        declined_reason: !accept ? reason : '',
        dynamicInputs: [],
        id: shipment?.id,
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
        navigation.navigate('details', {
          screen: 'shipment',
          params: {
            id: shipment?.id,
          },
        })
        getShipments(type, dispatch, setShipments, toast)
      },
      toast
    )
  }
  //

  async function schedulePushNotification(id) {
    if (id)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've A Shipment",
          body: 'Shipment Details',
          data: {
            name: 'details',
            screen: 'shipment',
            params: {
              id: id,
              notification: true,
            },
          },
        },
        trigger: null,
      })
  }

  async function playSound(id) {
    // console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/short_notification.mp3')
    )
    setSound(sound)

    await schedulePushNotification(id)
    // console.log('Playing Sound')
    await sound.playAsync()
    await sound.playAsync()
  }

  //
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  useEffect(() => {
    getShipments(type, dispatch, setShipments, toast)
    fetchCurrentLocation()
  }, [type, refresh])

  useEffect(() => {
    if (
      shipments?.results?.[0] &&
      user?.groupdetail?.name?.toLowerCase() === DRIVERS &&
      shipment?.results?.[0]?.originlng &&
      shipment?.results?.[0]?.originlat &&
      shipment?.results?.[0]?.lng &&
      shipment?.results?.[0]?.lat
    ) {
      setShipment(shipments?.results?.[0])
      setNewVisible(true)

      Vibration.vibrate(PATTERN)
      playSound(shipments?.results?.[0]?.id)
    }
  }, [shipments])

  return (
    <View style={styles.container}>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        input={reason}
        setInput={setReason}
        onSuccess={() => {
          onAdd(false)
        }}
      />
      {user?.groupdetail?.name?.toLowerCase() === DRIVERS && (
        <DriverModal
          visible={newVisible}
          setVisible={setNewVisible}
          input={reason}
          setInput={setReason}
          onSuccess={() => {
            onAdd(false)
          }}
          onCancel={() => {
            setShipment(shipment)
            setVisible(true)
          }}
          shipment={shipment}
          location={location}
        />
      )}
      {!cantAdd && (
        <AddNew
          title={'New Shipment'}
          page={{
            name: 'details',
            screen: 'shipment_type',
            params: { choose: true },
          }}
        />
      )}

      {shipments?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            isOnlyText={true}
            page={{
              name: 'details',
              screen: 'shipment',
              params: {
                id: item?.id,
              },
            }}
          >
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              <CardDetail
                label={'Shipment Method'}
                value={item?.shipmenttypedetail?.name}
              />
              {/* <CardDetail
                label={'Customer'}
                value={item?.productdetail?.userdetail?.first_name}
              /> */}
              <CardDetail
                label={'Transportation'}
                value={item?.vehicledetail?.type}
              />
              <CardDetail
                label={'Product'}
                value={item?.productdetail?.product_name}
              />
              <CardDetail label={'Product Qty'} value={item?.productqty} />
              <CardDetail label={'Status'} value={item?.status} />
              <CardDetail
                label={'Created At'}
                value={item?.created_at?.replace(' ', '\n')}
              />
            </View>
            {user?.groupdetail?.name?.toLowerCase() === DRIVERS &&
              item?.status?.toLowerCase() === INITIALIZED && (
                <Footer
                  onSave={() => {
                    setShipment(item)
                    onAdd(true)
                  }}
                  onCancel={() => {
                    setShipment(item)
                    setVisible(true)
                  }}
                  saveText={'Accept'}
                  cancelText={'Decline'}
                />
              )}
            <View style={{ width: '90%' }}>
              {user?.groupdetail?.name?.toLowerCase() === DRIVERS &&
                item?.status?.toLowerCase() === ACCEPTED && (
                  <Footer
                    onSave={() => {
                      //
                    }}
                    start
                    saveText={'Start'}
                  />
                )}
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Started
