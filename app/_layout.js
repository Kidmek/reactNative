import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { ToastProvider } from 'react-native-toast-notifications'
import { store } from '../store'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Text } from 'react-native'
import { COLORS } from '../constants'
import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import Loader from '../components/common/loader/Loader'

SplashScreen.preventAutoHideAsync()

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
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
        </Stack>
        <StatusBar style='dark' />
      </ToastProvider>
    </Provider>
  )
}

export default Layout
