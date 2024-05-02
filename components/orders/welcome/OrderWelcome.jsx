import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native'

import styles from '../../common/styles/common.style'
import { useSelector } from 'react-redux'
import {
  selectIsAdmin,
  selectIsFetching,
} from '../../../features/data/dataSlice'

import { useNavigation } from 'expo-router'
import Search from '../../common/search/Search'
import All from '../All/All'
import { SIZES } from '../../../constants'

const OrderWelcome = () => {
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
      contentContainerStyle={{
        paddingBottom: SIZES.large,
      }}
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

export default OrderWelcome
