import FontAwesome from '@expo/vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons'
import { Link, Tabs, useNavigation } from 'expo-router'
import { Pressable, useColorScheme } from 'react-native'
import { COLORS, icons, images } from '../../../constants'
import ScreenHeader from '../../../components/common/header/ScreenHeader'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <AntDesign size={20} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

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
            <TabBarIcon
              name='home'
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
            <ScreenHeader iconUrl={images.profile} dimension={'100%'} />
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
      />
    </Tabs>
  )
}
