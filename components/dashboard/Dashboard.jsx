import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'

import styles from './dashboard.style'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from 'expo-router'
import { ScrollView } from 'react-native'
import { getDashboardData } from '../../api/dashboard/dashboard'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { getOrders } from '../../api/order/order'
import { getWarehouses } from '../../api/warehouse/warehouse'
import { getAllProducts } from '../../api/product/product'
import { getStorages } from '../../api/storage/storage'
import { getShipments } from '../../api/shipment/shipment'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'

const Dashboard = () => {
  const iconSize = 20
  const fetching = useSelector(selectIsFetching)

  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()
  const [dashboardData, setDashboardData] = useState({})
  const [orders, setOrders] = useState()
  const [products, setProducts] = useState()
  const [storageTypes, setStorageTypes] = useState()
  const [shipments, setShipments] = useState()
  const [warehouses, setWarehouses] = useState()
  const handleAdd = (title, params) => {
    navigation.navigate('new', { screen: title, params: { type: params } })
  }

  useEffect(() => {
    getOrders(null, dispatch, setOrders, toast)
    getWarehouses(null, dispatch, setWarehouses, toast)
    getAllProducts(null, dispatch, setProducts, toast)
    getStorages(null, dispatch, setStorageTypes, toast)
    getShipments(null, dispatch, setShipments, toast)
  }, [])

  const cardView = (props) => {
    return (
      <View style={styles.singleContainer}>
        <View style={styles.icon}>{props?.icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.amount}>{props?.total}</Text>
          <Text style={styles.title}>{props?.title}</Text>
        </View>
      </View>
    )
  }

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.col}>
          {/* Storage Types */}
          {cardView({
            icon: (
              <MaterialIcons
                name='storage'
                size={iconSize}
                color={COLORS.primary}
              />
            ),
            name: 'storage',
            title: 'Total Storage Types',
            total: storageTypes?.count,
          })}

          {/* Products */}
          {cardView({
            icon: (
              <FontAwesome5
                name='user-friends'
                size={iconSize}
                color={COLORS.primary}
              />
            ),
            name: 'product',
            title: 'Total Products',
            total: products?.count,
          })}
        </View>

        <View style={styles.col}>
          {/* Warehouse */}
          {cardView({
            icon: (
              <FontAwesome5
                name='truck'
                size={iconSize}
                color={COLORS.primary}
              />
            ),
            name: 'shipment',
            title: 'Total Warehouse',
            total: warehouses?.count,
          })}

          {/* Orders */}
          {cardView({
            icon: (
              <FontAwesome5
                name='shopping-cart'
                size={iconSize}
                color={COLORS.primary}
              />
            ),
            name: 'order',
            title: 'Total Orders',
            total: orders?.count,
          })}
        </View>

        <View style={styles.col}>
          {/* Shipments */}
          {cardView({
            icon: (
              <FontAwesome5
                name='truck'
                size={iconSize}
                color={COLORS.primary}
              />
            ),
            name: 'shipment',
            title: 'Total Shipments',
            total: shipments?.count,
          })}
        </View>
      </View>
    </ScrollView>
  )
}

export default Dashboard
