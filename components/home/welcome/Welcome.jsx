import React, { useState } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
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
  const [refresh, setRefresh] = useState(false)

  const isAdmin = useSelector(selectIsAdmin)

  const body = () => {
    switch (activeType) {
      case warehouseTypes[0]:
        return <Warehouse refresh={refresh} />
      case warehouseTypes[1]:
        return <Office refresh={refresh} />
      case warehouseTypes[2]:
        return <OfficeEquipments refresh={refresh} />
      case warehouseTypes[3]:
        return <StorageType refresh={refresh} />
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
