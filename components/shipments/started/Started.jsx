import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './started.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { COLORS } from '../../../constants'
import { getShipments } from '../../../api/shipment/shipment'

const Started = ({ fetching, type }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()
  const [shipments, setShipments] = useState()

  useEffect(() => {
    getShipments(type, dispatch, setShipments, toast)
  }, [type])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'product',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Shipment</Text>
      </TouchableOpacity>

      {shipments?.data?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.warehouseContainer}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'warehouse',
                params: { type: 'Unmanaged', id: item.id },
              })
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                Shipment Method : {item?.shipmentMethod?.name}
              </Text>
              <Text style={styles.jobName}>
                Customer : {item?.shipmentCustomer?.first_name}
              </Text>
              <Text style={styles.jobName}>
                Transportation : {item?.transportation?.transportation_name}
              </Text>
              <Text style={styles.jobName}>
                Product : {item?.shippingProduct?.product_name}
              </Text>
              <Text style={styles.jobName}>
                Product Quantity : {item?.productQty}
              </Text>
              <Text style={styles.type}>Status : {item?.status}</Text>
              <Text style={styles.type}>Created At : {item?.created_at}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Started
