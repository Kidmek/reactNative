import React, { useState } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import styles from '../../common/styles/common.style'
import { AntDesign } from '@expo/vector-icons'
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
import { SIZES } from '../../../constants'

const InsuranceWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()

  const fetching = useSelector(selectIsFetching)
  const isAdmin = useSelector(selectIsAdmin)
  const [refresh, setRefresh] = useState(false)

  return (
    <ScrollView
      style={styles.welcomeContainer}
      contentContainerStyle={{
        paddingBottom: SIZES.medium,
      }}
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
        {isAdmin && (
          <View style={styles.shipmentHeader}>
            <TouchableOpacity
              style={styles.shipmentHeaderWrapper}
              onPress={() => {
                navigation.navigate('details', {
                  screen: 'insurance_options',
                })
              }}
            >
              <AntDesign size={25} name='setting' />
              <View>
                <Text style={styles.name}>Insurance Options</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <All fetching={fetching} refresh={refresh} />
    </ScrollView>
  )
}

export default InsuranceWelcome
