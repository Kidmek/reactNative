import { View, Text, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'

import styles from './dashboard.style'
import { FontAwesome } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import { useNavigation } from 'expo-router'
import { ScrollView } from 'react-native'
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
import SpaceSVG from '../../assets/icons/space'
import ProductSVG from '../../assets/icons/product'
import ShipmentSVG from '../../assets/icons/shipment'
import OrderSVG from '../../assets/icons/order'
import PaymentSVG from '../../assets/icons/payment'
import DashboardChart from './DashboardChart'

const Dashboard = () => {
  const iconSize = 30
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
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getOrders(null, dispatch, setOrders, toast)
    getWarehouses(null, dispatch, setWarehouses, toast)
    getAllProducts(null, dispatch, setProducts, toast)
    getStorages(null, dispatch, setStorageTypes, toast)
    getShipments(null, dispatch, setShipments, toast)
  }, [refresh])

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

  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      refreshControl={
        <RefreshControl
          refreshing={fetching}
          onRefresh={() => setRefresh(!refresh)}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.col}>
          {/* Storage Types */}
          {cardView({
            icon: <SpaceSVG color={COLORS.primary} size={iconSize} />,
            name: 'storage',
            title: 'Total Storage Types',
            total: storageTypes?.count,
          })}

          {/* Products */}
          {cardView({
            icon: <ProductSVG color={COLORS.primary} size={iconSize} />,
            name: 'product',
            title: 'Total Products',
            total: products?.count,
          })}
        </View>
        <View style={styles.col}>
          {/* Warehouse */}
          {cardView({
            icon: <ShipmentSVG color={COLORS.primary} size={iconSize} />,
            name: 'shipment',
            title: 'Total Warehouse',
            total: warehouses?.count,
          })}

          {/* Orders */}
          {cardView({
            icon: <OrderSVG color={COLORS.primary} size={iconSize} />,
            name: 'order',
            title: 'Total Orders',
            total: orders?.count,
          })}
        </View>

        <View style={styles.col}>
          {/* Shipments */}
          {cardView({
            icon: <ShipmentSVG color={COLORS.primary} size={iconSize} />,
            name: 'shipment',
            title: 'Total Shipments',
            total: shipments?.count,
          })}

          {/* Payments */}
          {cardView({
            icon: (
              <FontAwesome
                name='credit-card'
                color={COLORS.primary}
                size={iconSize}
              />
            ),
            name: 'payment',
            title: 'Total Payment',
            total: 0,
          })}
        </View>
      </View>
      <DashboardChart />
    </ScrollView>
  )
}

export default Dashboard
