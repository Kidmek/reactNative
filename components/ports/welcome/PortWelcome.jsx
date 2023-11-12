import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

import styles from '../../common/styles/common.style'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'

import Search from '../../common/search/Search'
import All from '../All/All'
import Header from '../../common/header/Header'

const PortWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()

  const fetching = useSelector(selectIsFetching)

  return (
    <ScrollView>
      <View style={styles.welcomeContainer}>
        <Header name={'Adrian'} text={'Port'} />

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

export default PortWelcome
