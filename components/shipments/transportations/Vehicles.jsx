import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
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

const Vehicles = ({ amount, product, setShipment, shipment }) => {
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
      })}
    </ScrollView>
  )
}

export default Vehicles
