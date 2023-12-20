import FontAwesome from '@expo/vector-icons/FontAwesome'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs, useNavigation } from 'expo-router'
import { COLORS, FONT, SIZES } from '../../../constants'
import { useState } from 'react'
import { show } from '../../../features/modal/modalSlice'
import { store } from '../../../store'
import { HeaderOptions } from '../../../components/common/header/HeaderOptions'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const navigation = useNavigation()
  const [notification, setNotification] = useState(1)
  const dispatch = store.dispatch

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
          tabBarLabel: 'Warehouse',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name='warehouse'
              size={size}
              color={color}
            />
          ),
          ...HeaderOptions(navigation, notification),
        }}
      />
      <Tabs.Screen
        name='product'
        options={{
          tabBarLabel: 'Product',
          tabBarIcon: ({ size, color }) => (
            <AntDesign size={size} color={color} name='hdd' />
          ),
          ...HeaderOptions(navigation, notification),
        }}
      />
      <Tabs.Screen
        name='order'
        options={{
          title: 'Order',
          tabBarIcon: ({ size, color }) => (
            <AntDesign size={size} color={color} name='shoppingcart' />
          ),
          ...HeaderOptions(navigation, notification),
        }}
      />
      <Tabs.Screen
        name='shipment'
        options={{
          title: 'Shipment',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name='truck' color={color} />
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
