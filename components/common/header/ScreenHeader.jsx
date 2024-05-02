import React from 'react'

import styles from './screenheader.style'
import { Image, Text, TouchableOpacity } from 'react-native'
import { SIZES } from '../../../constants'

const ScreenHeader = ({ iconUrl, dimension, handlePress, placeholder }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      {iconUrl ? (
        <Image source={iconUrl} style={styles.btnImg(dimension)} />
      ) : (
        <Text
          style={{
            fontSize: SIZES.xLarge,
            // fontFamily: FONT.regular,
          }}
        >
          {placeholder?.charAt(0)?.toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default ScreenHeader
