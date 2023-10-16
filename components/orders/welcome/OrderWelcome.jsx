import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from './welcome.style'
import allStyles from '../../shipments/started/started.style'
import { FontAwesome5, Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'

import { useNavigation } from 'expo-router'
import Search from '../../common/search/Search'
import All from '../All/All'

const OrderWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()

  const fetching = useSelector(selectIsFetching)

  return (
    <ScrollView>
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.userName}>Hello Adrian</Text>
          <Text style={styles.welcomeMessage}>Find Your Order</Text>
        </View>

        <View style={styles.shipmentHeader}>
          <TouchableOpacity
            style={styles.shipmentHeaderWrapper}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'order_type',
              })
            }}
          >
            <FontAwesome5 size={30} name='shopping-basket' />
            <View style={allStyles.textContainer}>
              <Text style={allStyles.name}>Order Type</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </View>
      <All fetching={fetching} />
    </ScrollView>
  )
}

export default OrderWelcome
