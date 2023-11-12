import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import styles from '../../common/styles/common.style'
import { productTypes } from '../../../constants/strings'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import All from '../all/All'
import Returned from '../returned/Returned'
import Damaged from '../damaged/Damaged'
import Categories from '../categories/Categories'
import Types from '../types/Types'
import Search from '../../common/search/Search'
import Header from '../../common/header/Header'
import CustomTabs from '../../common/header/CustomTabs'

const ProductWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const [activeType, setActiveType] = useState(productTypes[0])
  const fetching = useSelector(selectIsFetching)

  const body = () => {
    switch (activeType) {
      case productTypes[0]:
        return <All fetching={fetching} />
      case productTypes[1]:
        return <Returned fetching={fetching} />
      case productTypes[2]:
        return <Damaged fetching={fetching} />
      case productTypes[3]:
        return <Categories fetching={fetching} />
      case productTypes[4]:
        return <Types fetching={fetching} />
    }
  }
  return (
    <ScrollView>
      <View style={styles.welcomeContainer}>
        <Header name={'Adrian'} text={'Product'} />
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <CustomTabs
          data={productTypes}
          setActiveType={setActiveType}
          activeType={activeType}
        />
      </View>
      {body()}
    </ScrollView>
  )
}

export default ProductWelcome
