import { View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../auth.style'
import { COLORS, SIZES } from '../../../constants'

export default function FlashScreen() {
  return (
    <View style={styles.mainBody}>
      <View style={{ alignItems: 'center', gap: SIZES.xxLargePicture }}>
        <Image
          source={require('../../../assets/images/logo.jpg')}
          style={styles.logoStyle}
        />

        <ActivityIndicator size={SIZES.smallPicture} color={COLORS.primary} />
      </View>
    </View>
  )
}
