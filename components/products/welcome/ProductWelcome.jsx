import React, { useState } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'

import styles from './welcome.style'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { SIZES, icons } from '../../../constants'
import { productTypes, warehouseTypes } from '../../../constants/strings'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import All from '../all/All'
import Returned from '../returned/Returned'
import Damaged from '../damaged/Damaged'
import Categories from '../categories/Categories'
import Types from '../types/Types'
import Search from '../../common/search/Search'

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
        <View>
          <Text style={styles.userName}>Hello Adrian</Text>
          <Text style={styles.welcomeMessage}>Find Your Perfect Product</Text>
        </View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <View style={styles.tabsContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={productTypes}
            horizontal
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeType, item)}
                onPress={() => {
                  setActiveType(item)
                }}
              >
                <Text style={styles.tabText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {body()}
    </ScrollView>
  )
}

export default ProductWelcome
