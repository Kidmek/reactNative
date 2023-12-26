import React, { useState } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'

import styles from '../../common/styles/common.style'

import Search from '../../common/search/Search'
import All from '../All/All'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'

const PortWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
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
      </View>
      <All refresh={refresh} />
    </ScrollView>
  )
}

export default PortWelcome
