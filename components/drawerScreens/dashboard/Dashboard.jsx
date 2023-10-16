import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import styles from './dashboard.style'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from 'expo-router'
import { ScrollView } from 'react-native'
import { getDashboardData } from '../../../api/dashboard/dashboard'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'

const Dashboard = () => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()
  const [dashboardData, setDashboardData] = useState({})
  const handleAdd = (title, params) => {
    navigation.navigate('new', { screen: title, params: { type: params } })
  }

  useEffect(() => {
    getDashboardData(null, dispatch, setDashboardData, toast)
  }, [])

  const cardView = (props) => {
    return (
      <View style={styles.singleContainer}>
        <View style={styles.icon}>{props?.icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Total {props?.title}</Text>
          <Text style={styles.amount}>{props?.total}</Text>
        </View>
        <TouchableOpacity onPress={() => handleAdd(props?.name, '')}>
          <AntDesign name='plus' size={25} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Warehouse */}
        <View style={styles.singleContainer}>
          <View style={styles.icon}>
            <FontAwesome5 name='warehouse' size={35} color='black' />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.outerTitle}>
              Total Warehouse : {dashboardData?.total_warehouse}
            </Text>
            <View style={styles.singleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.innerTitle}>Total Unmanaged</Text>
                <Text style={styles.amount}>{dashboardData?.managed}</Text>
              </View>
            </View>
            <View style={styles.singleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.innerTitle}>Total Managed</Text>

                <Text style={styles.amount}>
                  {(
                    parseInt(dashboardData?.total_warehouse) -
                    parseInt(dashboardData?.managed)
                  ).toString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Product */}
        <View style={styles.singleContainer}>
          <View style={styles.icon}>
            <FontAwesome5 name='shopping-bag' size={35} color='black' />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.outerTitle}>
              Total Products : {dashboardData?.totalProducts}
            </Text>
            <View style={styles.singleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.innerTitle}>Total Returned</Text>
                <Text style={styles.amount}>
                  {dashboardData?.total_returned}
                </Text>
              </View>
            </View>
            <View style={styles.singleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.innerTitle}>Total Damaged</Text>
                <Text style={styles.amount}>
                  {dashboardData?.total_damaged}
                </Text>
              </View>
            </View>
            <View style={styles.singleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.innerTitle}>Total Expired</Text>
                <Text style={styles.amount}>{dashboardData?.totalExpired}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Storage */}
        {cardView({
          icon: <MaterialIcons name='storage' size={35} color='black' />,
          name: 'storage',
          title: 'Storages',
          total: dashboardData?.totalStorages,
        })}

        {/* Customers */}
        {cardView({
          icon: <FontAwesome5 name='user-friends' size={35} color='black' />,
          name: 'customer',
          title: 'Customers',
          total: 0,
        })}

        {/* Orders */}
        {cardView({
          icon: <FontAwesome5 name='shopping-cart' size={35} color='black' />,
          name: 'order',
          title: 'Orders',
          total: dashboardData?.totalOrders,
        })}

        {/* Shipments */}
        {cardView({
          icon: <FontAwesome5 name='truck' size={35} color='black' />,
          name: 'shipment',
          title: 'Shipments',
          total: dashboardData.totalShipments,
        })}
      </View>
    </ScrollView>
  )
}

export default Dashboard
