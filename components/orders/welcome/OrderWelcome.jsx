import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from '../../common/styles/common.style'
import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'

import { useNavigation } from 'expo-router'
import Search from '../../common/search/Search'
import All from '../All/All'
import Header from '../../common/header/Header'

const OrderWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()

  const fetching = useSelector(selectIsFetching)

  return (
    <ScrollView>
      <View style={styles.welcomeContainer}>
        <Header name={'Adrian'} text={'Order'} />

        <View style={styles.shipmentHeader}>
          <TouchableOpacity
            style={styles.shipmentHeaderWrapper}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'order_type',
              })
            }}
          >
            <FontAwesome5 size={25} name='shopping-basket' />
            <View>
              <Text style={styles.name}>Order Types</Text>
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
