import React, { useState } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'

import styles from '../../common/styles/common.style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import {
  selectIsAdmin,
  selectIsFetching,
} from '../../../features/data/dataSlice'

import { useNavigation } from 'expo-router'
import Search from '../../common/search/Search'
import All from '../All/All'

const PaymentWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()
  const isAdmin = useSelector(selectIsAdmin)
  const [refresh, setRefresh] = useState(false)

  const fetching = useSelector(selectIsFetching)

  return (
    <ScrollView
      style={styles.welcomeContainer}
      refreshControl={
        <RefreshControl
          refreshing={fetching}
          onRefresh={() => setRefresh(!refresh)}
        />
      }
    >
      <View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        {/* {isAdmin && (
          <View style={styles.shipmentHeader}>
            <TouchableOpacity
              style={styles.shipmentHeaderWrapper}
              onPress={() => {
                navigation.navigate('details', {
                  screen: 'order_type',
                })
              }}
            >
              <View>
                <Text style={styles.name}>Order Types</Text>
              </View>
            </TouchableOpacity>
          </View>
        )} */}
      </View>
      <All refresh={refresh} />
    </ScrollView>
  )
}

export default PaymentWelcome
