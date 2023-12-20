import { Stack, useRouter } from 'expo-router'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { MenuProvider } from 'react-native-popup-menu'
import { ToastProvider } from 'react-native-toast-notifications'
import { store } from '../store'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { COLORS } from '../constants'
import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import Loader from '../components/common/loader/Loader'
import CustomModal from '../components/common/modal/CustomModal'
import { Ionicons } from '@expo/vector-icons'

SplashScreen.preventAutoHideAsync()

const Layout = () => {
  const router = useRouter()
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    DMMedium: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    DMRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null
  return (
    <Provider store={store}>
      <Loader />

      <CustomModal />
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
              options={{
                presentation: 'transparentModal',
                animation: 'slide_from_bottom',
                headerShown: true,
                headerTransparent: true,
                headerTitle: 'Filters',
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
              }}
            />
          </Stack>
          <StatusBar style='dark' />
        </ToastProvider>
      </MenuProvider>
    </Provider>
  )
}

export default Layout
