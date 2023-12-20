import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from '../../common/styles/common.style'
import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import {
  selectIsAdmin,
  selectIsFetching,
} from '../../../features/data/dataSlice'

import { useNavigation } from 'expo-router'
import Search from '../../common/search/Search'
import All from '../All/All'
import Header from '../../common/header/Header'

const OrderWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()
  const isAdmin = useSelector(selectIsAdmin)

  const fetching = useSelector(selectIsFetching)

  return (
    <ScrollView style={styles.welcomeContainer}>
      <View>
        {/* <Header name={'Adrian'} text={'Order'} /> */}
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        {isAdmin && (
          <View style={styles.shipmentHeader}>
            <TouchableOpacity
              style={styles.shipmentHeaderWrapper}
              onPress={() => {
                navigation.navigate('details', {
                  screen: 'order_type',
                })
              }}
            >
              {/* <FontAwesome5 size={25} name='shopping-basket' /> */}
              <View>
                <Text style={styles.name}>Order Types</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <All fetching={fetching} />
    </ScrollView>
  )
}

export default OrderWelcome
