import React from 'react'

import styles from './screenheader.style'
import { Image, TouchableOpacity } from 'react-native'

const ScreenHeader = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image source={iconUrl} style={styles.btnImg(dimension)} />
    </TouchableOpacity>
  )
}

export default ScreenHeader
