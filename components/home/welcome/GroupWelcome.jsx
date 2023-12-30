import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './group.style'
import SpaceSVG from '../../../assets/icons/space'
import { COLORS, SIZES } from '../../../constants'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-svg'
import ShipmentSVG from '../../../assets/icons/shipment'
import CompleteSVG from '../../../assets/icons/complete'
import ProgressSVG from '../../../assets/icons/progress'
import InsuranceSVG from '../../../assets/icons/insurance'
import TransitSVG from '../../../assets/icons/transit'
import { AGENT, COMPANY, DRIVERS, TRANSITOR } from '../../../constants/strings'

const GroupWelcome = ({ group }) => {
  const iconSize = 25
  const [location, setLocation] = useState()
  const { width, height } = Dimensions.get('screen')
  const cardView = (props) => {
    return (
      <View style={styles.singleContainer}>
        <View style={styles.icon}>{props?.icon}</View>
        <View style={styles.textContainer}>
          {props?.total >= 0 ? (
            <Text style={styles.amount}>{props?.total}</Text>
          ) : (
            <ActivityIndicator color={COLORS.primary} />
          )}
          <Text style={styles.title}>{props?.title}</Text>
        </View>
      </View>
    )
  }
  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      toast.show('Permission to access location was denied')
      return
    }

    let location = await Location.getLastKnownPositionAsync({})
    setLocation(location)
  }

  useEffect(() => {
    fetchCurrentLocation()
  }, [])
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {/*Transitor  */}
      {group === TRANSITOR && (
        <View style={styles.wrapper}>
          {cardView({
            icon: <TransitSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Total Transits',
            total: Math.floor(Math.random() * 100),
          })}
          {cardView({
            icon: <ProgressSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Transits On Progress',
            total: Math.floor(Math.random() * 100),
          })}
          {cardView({
            icon: <CompleteSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Total Completed ',
            total: Math.floor(Math.random() * 100),
          })}
        </View>
      )}
      {/* Agent */}
      {group === AGENT && (
        <View style={styles.wrapper}>
          {cardView({
            icon: <InsuranceSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Total Insurances',
            total: Math.floor(Math.random() * 100),
          })}
          {cardView({
            icon: <ProgressSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Total On Progress',
            total: Math.floor(Math.random() * 100),
          })}
          {cardView({
            icon: <CompleteSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Total Completed ',
            total: Math.floor(Math.random() * 100),
          })}
        </View>
      )}
      {/* Driver  && Company*/}
      {(group === DRIVERS || group === COMPANY) && (
        <View style={styles.wrapper}>
          {cardView({
            icon: <ShipmentSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Total Shipment',
            total: Math.floor(Math.random() * 100),
          })}
          {cardView({
            icon: <ProgressSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Shipment On Progress',
            total: Math.floor(Math.random() * 100),
          })}
          {cardView({
            icon: <CompleteSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Total Completed ',
            total: Math.floor(Math.random() * 100),
          })}
        </View>
      )}
      {location && (
        <MapView
          style={{
            width: '100%',
            height: height * 0.35,
            marginTop: SIZES.large,
          }}
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            pinColor='red'
            coordinate={{
              latitude: '8.9790694',
              longitude: '38.7747988',
            }}
          />
        </MapView>
      )}
    </ScrollView>
  )
}

export default GroupWelcome
