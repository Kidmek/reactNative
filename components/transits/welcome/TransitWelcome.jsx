import React, { useState } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'

import styles from '../../common/styles/common.style'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'

import Search from '../../common/search/Search'
import All from '../All/All'

const TransitWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()

  const fetching = useSelector(selectIsFetching)
  const [refresh, setRefresh] = useState(false)

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
      </View>
      <All fetching={fetching} refresh={refresh} />
    </ScrollView>
  )
}

export default TransitWelcome
