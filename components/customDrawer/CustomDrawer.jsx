import { View, Image, Text } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import styles from './customDrawer.style'

export default function CustomDrawer(props) {
  return (
    // <View>
    //   <View style={styles.imageContainer}>
    //     <Image source={require('../../assets/images/logo.jpg')} />
    //   </View>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
    // </View>
  )
}
