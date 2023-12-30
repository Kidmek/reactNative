import React, { useState } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'

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
import ShipmentSVG from '../../../assets/icons/shipment'
import ShipmentTypeSVG from '../../../assets/icons/shipment-type'
import MethodSVG from '../../../assets/icons/methods'

const ShipmentWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()

  const [activeType, setActiveType] = useState(shipmentTypes[0])
  const fetching = useSelector(selectIsFetching)
  const isAdmin = useSelector(selectIsAdmin)
  const [refresh, setRefresh] = useState(false)

  const body = () => {
    switch (activeType) {
      case shipmentTypes[0]:
        return <Started fetching={fetching} refresh={refresh} />
      case shipmentTypes[1]:
        return <Transportations fetching={fetching} refresh={refresh} />
      case shipmentTypes[2]:
        return <ShipmentType fetching={fetching} refresh={refresh} />
      case shipmentTypes[3]:
        return <Methods fetching={fetching} refresh={refresh} />
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
            data={shipmentTypes}
            setActiveType={setActiveType}
            activeType={activeType}
            iconData={[
              (size, color) => <ShipmentSVG color={color} size={size} />,
              (size, color) => <ShipmentSVG color={color} size={size} />,

              (size, color) => <ShipmentTypeSVG color={color} size={size} />,
              (size, color) => <MethodSVG color={color} size={size} />,
            ]}
          />
        )}
      </View>
      {body()}
    </ScrollView>
  )
}

export default ShipmentWelcome
