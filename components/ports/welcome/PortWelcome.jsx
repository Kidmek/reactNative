import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

import styles from '../../common/styles/common.style'

import Search from '../../common/search/Search'
import All from '../All/All'

const PortWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()

  return (
    <ScrollView style={styles.welcomeContainer}>
      <View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </View>
      <All />
    </ScrollView>
  )
}

export default PortWelcome
