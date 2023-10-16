import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { Tabs, useNavigation } from 'expo-router'
import { TouchableOpacity, View, useColorScheme } from 'react-native'
import { COLORS, icons, images } from '../../../constants'
import ScreenHeader from '../../../components/common/header/ScreenHeader'
import { useState } from 'react'
import {
  selectView,
  show,
  toggleModal,
} from '../../../features/modal/modalSlice'
import { store } from '../../../store'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <AntDesign size={20} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const navigation = useNavigation()
  const [notification, setNotification] = useState(1)
  const dispatch = store.dispatch

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          headerShown: true,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name='warehouse'
              size={20}
              style={{ marginBottom: -3 }}
              color={focused ? 'white' : COLORS.secondary}
            />
          ),
          headerTitle: '',
          headerLeft: () => (
            <ScreenHeader
              iconUrl={icons.menu}
              dimension={'60%'}
              handlePress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('notification')
                }}
              >
                {notification ? (
                  <MaterialCommunityIcons
                    name='bell-badge-outline'
                    size={24}
                    color={COLORS.primary}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name='bell-outline'
                    size={24}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>
              <ScreenHeader iconUrl={images.profile} dimension={'100%'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='product'
        options={{
          title: 'Product',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name='hdd'
              color={focused ? 'white' : COLORS.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='order'
        options={{
          title: 'Order',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name='shoppingcart'
              color={focused ? 'white' : COLORS.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='shipment'
        options={{
          title: 'Shipment',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={20}
              name='truck'
              color={focused ? 'white' : COLORS.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='message'
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name='message1'
              color={focused ? 'white' : COLORS.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='logout'
        options={{
          title: 'Logout',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name='logout'
              color={focused ? 'white' : COLORS.secondary}
            />
          ),
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
