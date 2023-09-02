import React from 'react'
import { View, Text } from 'react-native'

import styles from './welcome.style'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { icons } from '../../../constants'

const Welcome = () => {
  return (
    <View style={styles.welcomeContainer}>
      <View>
        <Text style={styles.userName}>Hello Adrian</Text>
        <Text style={styles.welcomeMessage}>Find Your Perfect Warehouse</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=''
            onChange={() => {}}
            placeholder='What Are You Looking For?'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image source={icons.search} style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome
