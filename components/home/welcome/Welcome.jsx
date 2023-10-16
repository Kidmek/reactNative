import React, { useState } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'

import styles from './welcome.style'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { SIZES, icons } from '../../../constants'
import { warehouseTypes } from '../../../constants/strings'
import Warehouse from '../warehouse/Warehouse'
import Managed from '../managed/Managed'
import Office from '../office/Office'
import OfficeEquipments from '../officeEquipments/OfficeEquipments'
import StorageType from '../storageTypes/StorageTypes'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import Search from '../../common/search/Search'

const Welcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const [activeType, setActiveType] = useState(warehouseTypes[0])
  const fetching = useSelector(selectIsFetching)

  const body = () => {
    switch (activeType) {
      case warehouseTypes[0]:
        return <Warehouse fetching={fetching} />
      case warehouseTypes[1]:
        return <Managed fetching={fetching} />
      case warehouseTypes[2]:
        return <Office fetching={fetching} />
      case warehouseTypes[3]:
        return <OfficeEquipments fetching={fetching} />
      case warehouseTypes[4]:
        return <StorageType fetching={fetching} />
    }
  }
  return (
    <ScrollView>
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.userName}>Hello Adrian</Text>
          <Text style={styles.welcomeMessage}>Find Your Perfect Warehouse</Text>
        </View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <View style={styles.tabsContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={warehouseTypes}
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

export default Welcome
