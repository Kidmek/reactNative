import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../shipments/started/started.style'
import { COLORS } from '../../../constants'
import { useNavigation } from 'expo-router'
import { store } from '../../../store'
import { AntDesign } from '@expo/vector-icons'

import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import { getOrders } from '../../../api/order/order'

const All = ({ fetching }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [orders, setOrders] = useState()

  useEffect(() => {
    getOrders(null, dispatch, setOrders, toast)
  }, [])
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
        <Text style={styles.headerTitle}>New Order</Text>
      </TouchableOpacity>

      {orders?.data?.map((item, index) => {
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
                Order Type : {item?.orderType?.ordertype_name}
              </Text>
              <Text style={styles.jobName}>
                Ordered :{' '}
                {item?.orderType?.ordertype_name == 'Storage'
                  ? item?.orderStorage?.storage_name
                  : item?.orderWarehouse?.warehouse_name}
              </Text>
              <Text style={styles.jobName}>
                Start Date : {item?.starting_date}
              </Text>
              <Text style={styles.jobName}>End Date : {item?.end_date}</Text>
              <Text style={styles.jobName}>
                Remaining Date : {item?.remaining_date}
              </Text>
              <Text style={styles.jobName}>
                Customer : {item?.customer?.first_name}
              </Text>
              <Text style={styles.jobName}>Price : {item?.price} Birr</Text>
              <Text style={styles.type}>Status : {item?.status}</Text>
              <Text style={styles.type}>Created At : {item?.created_at}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default All
