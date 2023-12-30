import { useNavigation, withLayoutContext } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../../components/customDrawer/CustomDrawer'
import { useState } from 'react'
import { selectData, selectIsAdmin } from '../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import PortWelcome from '../../components/ports/welcome/PortWelcome'
import StaffWelcome from '../../components/staffs/welcome/StaffWelcome'
import Customers from '../../components/staffs/Customers/Customers'
import Schedule from '../../components/Schedule/Schedule'
import {
  AGENT,
  COMPANY,
  DRIVERS,
  LABOUR,
  MANAGER,
  RENTER,
  TRANSITOR,
} from '../../constants/strings'

// const DrawerNavigator = createDrawerNavigator().Navigator

// const Drawer = withLayoutContext(DrawerNavigator)

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
}

export default function DrawerLayout() {
  const navigation = useNavigation()
  const [notification, setNotification] = useState(1)
  const isAdmin = useSelector(selectIsAdmin)
  const user = useSelector(selectData)

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name='(drawer)'
        options={{
          title: 'Home',
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name='wizard'
        options={{
          title: 'Wizard',
          drawerItemStyle: { display: 'none' },

          headerShown: true,
        }}
      />

      <Drawer.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name='dashboard'
        options={{
          headerShown: true,
          drawerItemStyle: { display: 'none' },

          title: 'Dashboard',
        }}
      />

      <Drawer.Screen
        name='payments'
        options={{
          title: 'Payments',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name='insurances'
        options={{
          drawerItemStyle: {
            display:
              user?.groupdetail?.name?.toLowerCase() === RENTER ||
              user?.groupdetail?.name?.toLowerCase() === DRIVERS ||
              user?.groupdetail?.name?.toLowerCase() === LABOUR ||
              user?.groupdetail?.name?.toLowerCase() === MANAGER ||
              user?.groupdetail?.name?.toLowerCase() === COMPANY ||
              user?.groupdetail?.name?.toLowerCase() === TRANSITOR
                ? 'none'
                : 'flex',
          },
          title: 'Insurances',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name='transits'
        options={{
          drawerItemStyle: {
            display:
              user?.groupdetail?.name?.toLowerCase() === RENTER ||
              user?.groupdetail?.name?.toLowerCase() === DRIVERS ||
              user?.groupdetail?.name?.toLowerCase() === LABOUR ||
              user?.groupdetail?.name?.toLowerCase() === AGENT ||
              user?.groupdetail?.name?.toLowerCase() === MANAGER ||
              user?.groupdetail?.name?.toLowerCase() === COMPANY
                ? 'none'
                : 'flex',
          },

          title: 'Customes Transits',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name='reports'
        options={{
          title: 'Reports & Analytics',
          drawerItemStyle: { display: 'none' },

          headerShown: true,
        }}
      />

      <Drawer.Screen
        name='ports'
        options={{
          title: 'Ports',
          headerShown: true,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name='staffs'
        options={{
          title: 'User Groups',
          headerShown: true,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name='customers'
        options={{
          title: 'Customers',
          headerShown: true,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name='schedule'
        options={{
          title: 'Schedule A Visit',
          headerShown: true,
          drawerItemStyle: { display: 'none' },
        }}
      />

      <Drawer.Screen
        name='about'
        options={{
          title: 'About Us',
          headerShown: true,
        }}
      />
    </Drawer>
  )
}
