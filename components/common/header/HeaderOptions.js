import ScreenHeader from './ScreenHeader'
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'
import { COLORS, FONT, SIZES, icons, images } from '../../../constants'

export const HeaderOptions = (navigation, notification) => {
  return {
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
  }
}
