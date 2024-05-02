import ScreenHeader from './ScreenHeader'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'
import { COLORS, icons } from '../../../constants'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/data/dataSlice'
import { API, BACKEND_DOMAIN } from '../../../constants/strings'

export const HeaderOptions = (navigation, notification) => {
  //  {
  //    user.ProfilePicture ? (
  //      <Image
  //        source={{ uri: API + '/' + user.ProfilePicture }}
  //        style={styles.btnImg(dimension)}
  //      />
  //    ) : (
  //      <Text>{user?.first_name?.charAt(0)?.toUpperCase()}</Text>
  //    )
  //  }
  const user = useSelector(selectUser)

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
        <ScreenHeader
          iconUrl={
            user?.ProfilePicture
              ? { uri: `${BACKEND_DOMAIN}/media/${user.ProfilePicture}` }
              : null
          }
          dimension={'100%'}
          placeholder={user?.first_name}
          handlePress={() => {
            navigation.navigate('profile')
          }}
        />
      </View>
    ),
  }
}
