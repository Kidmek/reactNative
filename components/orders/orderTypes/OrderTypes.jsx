import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import styles from '../../shipments/started/started.style'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'

import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../constants'
import { getOrderTypes } from '../../../api/order/order'
const OrderTypes = () => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const [orderTypes, setOrderTypes] = useState()
  useEffect(() => {
    getOrderTypes(null, dispatch, setOrderTypes, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('new', {
              screen: 'warehouse',
            })
          }}
          style={styles.headerBtn}
        >
          <AntDesign name='plus' size={20} color={'white'} />
          <Text style={styles.headerTitle}>New Order Type</Text>
        </TouchableOpacity>
      </View>
      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        orderTypes?.data?.map((item, index) => {
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
                  {item?.ordertype_name}
                </Text>
                <Text style={styles.jobName}>{item?.meta}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      )}
    </ScrollView>
  )
}

export default OrderTypes
