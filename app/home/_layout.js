import { withLayoutContext } from 'expo-router'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../../components/customDrawer/CustomDrawer'

const DrawerNavigator = createDrawerNavigator().Navigator

const Drawer = withLayoutContext(DrawerNavigator)

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
}

export default function DrawerLayout() {
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
      />
      <Drawer.Screen
        name='profile'
        options={{
          title: 'Profile',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='dashboard'
        options={{
          headerShown: true,
          title: 'Dashboard',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='customers'
        options={{
          title: 'Customers',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='staffs'
        options={{
          title: 'User Groups',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='transits'
        options={{
          title: 'Customes Transits',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='ports'
        options={{
          title: 'Ports',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='payments'
        options={{
          title: 'Payments',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='insurances'
        options={{
          title: 'Insurances',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='reports'
        options={{
          title: 'Reports & Analytics',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='schedule'
        options={{
          title: 'Schedule Visit',
          // drawerLabelStyle: { marginLeft: -25 },
          //   drawerIcon: () => <PinIcon height={48} />,
        }}
      />
      <Drawer.Screen
        name='about'
        options={{
          title: 'About Us',
          // drawerLabelStyle: { marginLeft: -25 },
          // drawerIcon: () => <AboutIcon height={48} />,
        }}
      />
    </Drawer>
  )
}
