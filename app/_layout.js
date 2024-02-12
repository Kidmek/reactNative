import { Stack, router, useNavigation, useRouter } from 'expo-router'
import { Provider } from 'react-redux'
import { MenuProvider } from 'react-native-popup-menu'
import { ToastProvider } from 'react-native-toast-notifications'
import { store } from '../store'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { COLORS } from '../constants'
import { useCallback, useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import Loader from '../components/common/loader/Loader'
import { Ionicons } from '@expo/vector-icons'
import LogoutModal from '../components/common/modal/LogoutModal'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})
async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    alert('Must use physical device for Push Notifications')
  }

  return token
}
function useNotificationObserver() {
  const navigation = useNavigation()
  useEffect(() => {
    registerForPushNotificationsAsync()
    let isMounted = true

    function redirect(notification) {
      const data = notification.request.content.data
      // console.log('_layout Notification Redirect')
      // console.log(data?.params)
      if (data?.name) {
        navigation.navigate(data?.name, {
          screen: data?.screen,
          params: data?.params,
        })
        // router.push({
        //   pathname: '/' + data?.name + '/' + data?.screen,
        //   params: data?.params,
        // })
        // navigation.navigate('details', {
        //   screen: 'shipment',
        //   params: data?.params,
        // })
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return
      }
      redirect(response?.notification)
    })

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification)
      }
    )

    return () => {
      isMounted = false
      subscription.remove()
    }
  }, [])
}

export const unstable_settings = {
  initialRouteName: 'home/index',
}
SplashScreen.preventAutoHideAsync()

const Layout = () => {
  useNotificationObserver()

  const router = useRouter()
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    DMMedium: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    DMRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
  })

  const modalProps = (title) => {
    return {
      presentation: 'transparentModal',
      animation: 'slide_from_bottom',
      headerShown: true,
      headerTitle: title,
      headerTitleAlign: 'center',

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: '#fff',
            borderColor: COLORS.grey,
            borderRadius: 20,
            borderWidth: 1,
            padding: 4,
          }}
        >
          <Ionicons name='close-outline' size={22} />
        </TouchableOpacity>
      ),
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null
  return (
    <Provider store={store}>
      <Loader />

      <LogoutModal
        onSuccess={() => {
          router.back()
        }}
      />
      <MenuProvider>
        <ToastProvider
          placement='bottom'
          duration={2000}
          animationType='zoom-in'
          animationDuration={250}
          swipeEnabled={true}
          renderToast={(toast) => (
            <View
              style={[
                {
                  paddingHorizontal: 20,
                  paddingVertical: 12.5,
                  borderRadius: 50,
                  opacity: 0.85,
                },
                toast?.type == 'danger'
                  ? { backgroundColor: 'red' }
                  : toast?.type == 'success'
                  ? { backgroundColor: 'green' }
                  : toast?.type == 'warning'
                  ? { backgroundColor: 'orange' }
                  : { backgroundColor: 'black' },
              ]}
            >
              <Text style={{ color: COLORS.lightWhite }}>{toast.message}</Text>
            </View>
          )}
        >
          <Stack
            onLayout={onLayoutRootView}
            screenOptions={{ headerShown: false, animation: 'none' }}
          >
            <Stack.Screen name='index' />
            <Stack.Screen name='home' />
            <Stack.Screen
              name='notification'
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerTitle: 'Notifications',
              }}
            />
            <Stack.Screen
              name='(modals)/filter'
              options={modalProps('Filters')}
            />
            <Stack.Screen name='(modals)/driver' options={modalProps('')} />
            <Stack.Screen name='(modals)/agent' options={modalProps('')} />
            <Stack.Screen name='(modals)/company' options={modalProps('')} />
            <Stack.Screen name='(modals)/transitor' options={modalProps('')} />
          </Stack>
          <StatusBar style='dark' />
        </ToastProvider>
      </MenuProvider>
    </Provider>
  )
}

export default Layout
