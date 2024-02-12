import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs, useNavigation } from 'expo-router'
import { COLORS, FONT, SIZES } from '../../../constants'
import { useState } from 'react'
import { show } from '../../../features/modal/modalSlice'
import { store } from '../../../store'
import { HeaderOptions } from '../../../components/common/header/HeaderOptions'
import { selectData } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import {
  AGENT,
  COMPANY,
  DRIVERS,
  LABOUR,
  MANAGER,
  RENTER,
  TRANSITOR,
} from '../../../constants/strings'
import SpaceSVG from '../../../assets/icons/space'
import ProductSVG from '../../../assets/icons/product'
import OrderSVG from '../../../assets/icons/order'
import ShipmentSVG from '../../../assets/icons/shipment'
import InsuranceSVG from '../../../assets/icons/insurance'
import TransitSVG from '../../../assets/icons/transit'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const navigation = useNavigation()
  const [notification, setNotification] = useState(1)
  const dispatch = store.dispatch
  const user = useSelector(selectData)

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarLabelStyle: {
          fontFamily: FONT.regular,
          marginBottom: SIZES.small,
        },
        tabBarStyle: {
          height: '10%',
        },
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          // tabBarItemStyle: {
          //   display:
          //     user?.groupdetail?.name?.toLowerCase() === DRIVERS ||
          //     user?.groupdetail?.name?.toLowerCase() === AGENT ||
          //     user?.groupdetail?.name?.toLowerCase() === DRIVERS ||
          //     user?.groupdetail?.name?.toLowerCase() === MANAGER
          //       ? 'none'
          //       : 'flex',
          // },
          tabBarLabel:
            user?.groupdetail?.name?.toLowerCase() === RENTER
              ? 'Warehouse'
              : user?.groupdetail?.name?.toLowerCase() === TRANSITOR
              ? 'Transit'
              : user?.groupdetail?.name?.toLowerCase() === DRIVERS
              ? 'Shipment'
              : user?.groupdetail?.name?.toLowerCase() === AGENT
              ? 'Insurance'
              : 'Home',
          tabBarIcon: ({ size, color }) =>
            user?.groupdetail?.name?.toLowerCase() === TRANSITOR ? (
              <TransitSVG size={size} color={color} />
            ) : user?.groupdetail?.name?.toLowerCase() === DRIVERS ? (
              <ShipmentSVG size={size} color={color} />
            ) : user?.groupdetail?.name?.toLowerCase() === AGENT ? (
              <InsuranceSVG size={size} color={color} />
            ) : (
              <SpaceSVG size={size} color={color} />
            ),
          ...HeaderOptions(navigation, notification),
        }}
      />
      <Tabs.Screen
        name='product'
        options={{
          tabBarItemStyle: {
            display:
              user?.groupdetail?.name?.toLowerCase() === DRIVERS ||
              user?.groupdetail?.name?.toLowerCase() === AGENT ||
              user?.groupdetail?.name?.toLowerCase() === RENTER ||
              user?.groupdetail?.name?.toLowerCase() === MANAGER ||
              user?.groupdetail?.name?.toLowerCase() === COMPANY ||
              user?.groupdetail?.name?.toLowerCase() === LABOUR ||
              user?.groupdetail?.name?.toLowerCase() === TRANSITOR
                ? 'none'
                : 'flex',
          },
          tabBarLabel: 'Product',
          tabBarIcon: ({ size, color }) => (
            <ProductSVG size={size} color={color} />
          ),
          ...HeaderOptions(navigation, notification),
        }}
      />
      <Tabs.Screen
        name='order'
        options={{
          tabBarItemStyle: {
            display:
              user?.groupdetail?.name?.toLowerCase() === AGENT ||
              user?.groupdetail?.name?.toLowerCase() === MANAGER ||
              user?.groupdetail?.name?.toLowerCase() === COMPANY ||
              user?.groupdetail?.name?.toLowerCase() === DRIVERS ||
              user?.groupdetail?.name?.toLowerCase() === LABOUR ||
              user?.groupdetail?.name?.toLowerCase() === TRANSITOR
                ? 'none'
                : 'flex',
          },
          title: 'Order',
          tabBarIcon: ({ size, color }) => (
            <OrderSVG size={size} color={color} />
          ),
          ...HeaderOptions(navigation, notification),
        }}
      />
      <Tabs.Screen
        name='shipment'
        options={{
          tabBarItemStyle: {
            display:
              user?.groupdetail?.name?.toLowerCase() === DRIVERS ||
              user?.groupdetail?.name?.toLowerCase() === RENTER ||
              user?.groupdetail?.name?.toLowerCase() === LABOUR ||
              user?.groupdetail?.name?.toLowerCase() === AGENT ||
              user?.groupdetail?.name?.toLowerCase() === MANAGER ||
              user?.groupdetail?.name?.toLowerCase() === TRANSITOR
                ? 'none'
                : 'flex',
          },
          title: 'Shipment',
          tabBarIcon: ({ size, color }) => (
            <ShipmentSVG size={size} color={color} />
          ),
          ...HeaderOptions(navigation, notification),
        }}
      />
      <Tabs.Screen
        name='message'
        options={{
          title: 'Messages',
          tabBarIcon: ({ size, color }) => (
            <AntDesign size={size} color={color} name='message1' />
          ),
          ...HeaderOptions(navigation, notification),
        }}
      />
      <Tabs.Screen
        name='logout'
        options={{
          title: 'Logout',
          tabBarIcon: ({ size, color }) => (
            <AntDesign size={size} color={color} name='logout' />
          ),
          ...HeaderOptions(navigation, notification),
        }}
        listeners={() => ({
          tabPress: (e) => {
            dispatch(show())
            e.preventDefault()
          },
        })}
      />
    </Tabs>
  )
}
