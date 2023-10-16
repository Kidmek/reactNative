import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { store } from '../../store'
import { show } from '../../features/modal/modalSlice'

export default function CustomDrawer(props) {
  const dispatch = store.dispatch

  return (
    // <View>
    //   <View style={styles.imageContainer}>
    //     <Image source={require('../../assets/images/logo.jpg')} />
    //   </View>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
        label={'Logout'}
        onPress={() => {
          dispatch(show())
        }}
      />
    </DrawerContentScrollView>
    // </View>
  )
}
