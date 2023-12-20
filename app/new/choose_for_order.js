import { ScrollView, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Warehouse from '../../components/home/warehouse/Warehouse'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'
import { WAREHOUSE } from '../../constants/strings'
import StorageType from '../../components/home/storageTypes/StorageTypes'

const choose_for_order = () => {
  const fetching = useSelector(selectIsFetching)
  const params = useLocalSearchParams()
  return (
    <ScrollView>
      {params.type.toLowerCase() === WAREHOUSE ? (
        <Warehouse fetching={fetching} choose={true} params={params} />
      ) : (
        <StorageType fetching={fetching} choose={true} params={params} />
      )}
    </ScrollView>
  )
}

export default choose_for_order
