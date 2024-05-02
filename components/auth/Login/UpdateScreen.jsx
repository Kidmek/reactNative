import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import styles from '../auth.style'
import { FONT, SIZES } from '../../../constants'

export default function UpdateScreen({ force }) {
  return (
    <View style={styles.mainBody}>
      <View
        style={{
          paddingHorizontal: SIZES.large,
          gap: SIZES.small,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../../assets/images/logo.jpg')}
          style={{ height: SIZES.mediumPicture, width: SIZES.mediumPicture }}
        />
        <Text
          style={{
            fontSize: SIZES.xxLarge,
            fontFamily: FONT.bold,
          }}
        >
          Update your application to the latest version
        </Text>
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONT.regular,
            letterSpacing: 2,
          }}
        >
          {`A brand new version of the IMS app is available in the ${
            Platform.OS == 'android' ? 'Play Store' : 'App Store'
          }. Please update your app to use all our amazing features`}
        </Text>
      </View>
      <TouchableOpacity
        style={{ ...styles.buttonStyle }}
        activeOpacity={0.5}
        onPress={() => {}}
      >
        <Text style={styles.buttonTextStyle}>Update Now</Text>
      </TouchableOpacity>
    </View>
  )
}
