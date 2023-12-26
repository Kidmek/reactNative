import React, { useEffect, useState } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import styles from '../../common/styles/common.style'
import { customerProductTypes, productTypes } from '../../../constants/strings'
import { useSelector } from 'react-redux'
import {
  selectIsAdmin,
  selectIsFetching,
} from '../../../features/data/dataSlice'
import All from '../all/All'
import Returned from '../returned/Returned'
import Damaged from '../damaged/Damaged'
import Categories from '../categories/Categories'
import Types from '../types/Types'
import Search from '../../common/search/Search'
import CustomTabs from '../../common/header/CustomTabs'

const ProductWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const [activeType, setActiveType] = useState(productTypes[0])
  const fetching = useSelector(selectIsFetching)
  const isAdmin = useSelector(selectIsAdmin)
  const [refresh, setRefresh] = useState(false)

  const body = () => {
    switch (activeType) {
      case productTypes[0]:
        return <All refresh={refresh} isAdmin={isAdmin} />
      case productTypes[1]:
        return <Returned refresh={refresh} isAdmin={isAdmin} />
      case productTypes[2]:
        return <Damaged refresh={refresh} isAdmin={isAdmin} />
      case productTypes[3]:
        return <Categories refresh={refresh} />
      case productTypes[4]:
        return <Types refresh={refresh} />
    }
  }

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
        {/* <Header name={'Adrian'} text={'Product'} /> */}
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <CustomTabs
          data={isAdmin ? productTypes : customerProductTypes}
          setActiveType={setActiveType}
          activeType={activeType}
        />
      </View>
      {body()}
    </ScrollView>
  )
}

export default ProductWelcome
