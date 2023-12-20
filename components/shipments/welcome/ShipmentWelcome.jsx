import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

import styles from '../../common/styles/common.style'
import { useSelector } from 'react-redux'
import {
  selectIsAdmin,
  selectIsFetching,
} from '../../../features/data/dataSlice'
import { shipmentTypes } from '../../../constants/strings'
import Started from '../started/Started'
import Search from '../../common/search/Search'
import Transportations from '../transportations/Transportations'
import ShipmentType from '../type/ShipmentType'
import Methods from '../methods/Methods'
import CustomTabs from '../../common/header/CustomTabs'

const ShipmentWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()

  const [activeType, setActiveType] = useState(shipmentTypes[0])
  const fetching = useSelector(selectIsFetching)
  const isAdmin = useSelector(selectIsAdmin)

  const body = () => {
    switch (activeType) {
      case shipmentTypes[0]:
        return <Started fetching={fetching} />
      case shipmentTypes[1]:
        return <Transportations fetching={fetching} />
      case shipmentTypes[2]:
        return <ShipmentType fetching={fetching} />
      case shipmentTypes[3]:
        return <Methods fetching={fetching} />
    }
  }
  return (
    <ScrollView style={styles.welcomeContainer}>
      <View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        {isAdmin && (
          <CustomTabs
            data={shipmentTypes}
            setActiveType={setActiveType}
            activeType={activeType}
          />
        )}
      </View>
      {body()}
    </ScrollView>
  )
}

export default ShipmentWelcome
