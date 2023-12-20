import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import styles from '../../common/styles/common.style'
import { warehouseTypes } from '../../../constants/strings'
import Warehouse from '../warehouse/Warehouse'
import Managed from '../managed/Managed'
import Office from '../office/Office'
import OfficeEquipments from '../officeEquipments/OfficeEquipments'
import StorageType from '../storageTypes/StorageTypes'
import { useSelector } from 'react-redux'
import {
  selectIsAdmin,
  selectIsFetching,
} from '../../../features/data/dataSlice'
import Search from '../../common/search/Search'
import Header from '../../common/header/Header'
import CustomTabs from '../../common/header/CustomTabs'

const Welcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const [activeType, setActiveType] = useState(warehouseTypes[0])
  const fetching = useSelector(selectIsFetching)

  const isAdmin = useSelector(selectIsAdmin)

  const body = () => {
    switch (activeType) {
      case warehouseTypes[0]:
        return <Warehouse fetching={fetching} />
      case warehouseTypes[1]:
        return <Office fetching={fetching} />
      case warehouseTypes[2]:
        return <OfficeEquipments fetching={fetching} />
      case warehouseTypes[3]:
        return <StorageType fetching={fetching} />
    }
  }
  return (
    <ScrollView style={styles.welcomeContainer}>
      <View>
        {/* <Header name={'Adrian'} text={'Warehouse'} /> */}
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        {isAdmin && (
          <CustomTabs
            data={warehouseTypes}
            setActiveType={setActiveType}
            activeType={activeType}
          />
        )}
      </View>
      {body()}
    </ScrollView>
  )
}

export default Welcome
