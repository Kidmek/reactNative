import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getVehicleByRange } from '../../../api/shipment/shipment'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import SingleCard from '../../common/cards/single/SingleCard'
import styles from '../../common/styles/warehouse.style'
import commonStyles from '../../common/styles/common.style'
import Checkbox from 'expo-checkbox'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { COLORS, SIZES } from '../../../constants'
import Carousel from 'react-native-reanimated-carousel'
import { API, BACKEND_DOMAIN } from '../../../constants/strings'

const Vehicles = ({ amount, product, setShipment, shipment }) => {
  const width = Dimensions.get('window').width

  const [vehicles, setVehicles] = useState()
  //   const [vehicle, setVehicle] = useState()
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const dispatch = store.dispatch
  useEffect(() => {
    if (amount && product) {
      getVehicleByRange(
        product?.id + '/' + amount,
        dispatch,
        setVehicles,
        toast
      )
    }
  }, [])
  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView
      contentContainerStyle={{
        paddingTop: SIZES.small,
      }}
    >
      {vehicles?.map((item) => {
        if (item?.vehicleimages?.length)
          return (
            <View key={item?.id}>
              <SingleCard
                onClick={() => {
                  //   if (shipment) {
                  setShipment({
                    ...shipment,
                    vehicle: item?.id,
                  })
                  //   } else {
                  //     setVehicle(item?.id)
                  //   }
                }}
              >
                <Carousel
                  loop={item?.vehicleimages?.length > 1 ? true : false}
                  height={width / 2}
                  width={width}
                  pagingEnabled={true}
                  data={item?.vehicleimages}
                  autoPlay={true}
                  scrollAnimationDuration={1000}
                  autoPlayInterval={2500}
                  renderItem={({ item: image }) => (
                    <Image
                      style={{
                        ...commonStyles.image,
                        alignSelf: 'center',
                      }}
                      source={{
                        uri: BACKEND_DOMAIN + image?.image,
                      }}
                    />
                  )}
                  panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                  }}
                />
                <View
                  style={{
                    ...commonStyles.wizCheckerHeader,
                    paddingEnd: SIZES.small,
                  }}
                >
                  <View style={commonStyles.textContainer}>
                    <Text style={styles.name}>{item?.type}</Text>
                    <Text style={styles.type}>
                      <Text style={styles.label}>License Plate: </Text>
                      {item?.licenseplate}
                    </Text>
                    <Text style={styles.type}>
                      <Text style={styles.label}>
                        Height : {item?.height} , Length : {item?.length}, Width
                        :{item?.width}
                      </Text>
                    </Text>
                  </View>

                  <Checkbox
                    color={COLORS.primary}
                    value={
                      // shipment
                      //   ?
                      item?.id === shipment?.vehicle
                      //   : item?.id === vehicle
                    }
                    onValueChange={() => {
                      // if (shipment) {
                      setShipment({
                        ...shipment,
                        vehicle: item?.id,
                      })
                      // } else {
                      //   setVehicle(item?.id)
                      // }
                    }}
                  />
                </View>
              </SingleCard>
              <View style={commonStyles.divider} />
            </View>
          )
        else {
          return (
            <SingleCard
              key={item?.id}
              isOnlyText
              onClick={() => {
                //   if (shipment) {
                setShipment({
                  ...shipment,
                  vehicle: item?.id,
                })
                //   } else {
                //     setVehicle(item?.id)
                //   }
              }}
            >
              <View style={{ ...styles.textContainer, alignSelf: 'stretch' }}>
                <View style={commonStyles.wizCheckerHeader}>
                  <Text style={styles.name}>{item?.type}</Text>
                  <Checkbox
                    color={COLORS.primary}
                    value={
                      // shipment
                      //   ?
                      item?.id === shipment?.vehicle
                      //   : item?.id === vehicle
                    }
                    onValueChange={() => {
                      // if (shipment) {
                      setShipment({
                        ...shipment,
                        vehicle: item?.id,
                      })
                      // } else {
                      //   setVehicle(item?.id)
                      // }
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.type}>
                    <Text style={styles.label}>License Plate: </Text>
                    {item?.licenseplate}
                  </Text>
                  <Text style={styles.type}>
                    <Text style={styles.label}>
                      Height : {item?.height} , Length : {item?.length}, Width :
                      {item?.width}
                    </Text>
                  </Text>
                </View>
              </View>
            </SingleCard>
          )
        }
      })}
    </ScrollView>
  )
}

export default Vehicles
