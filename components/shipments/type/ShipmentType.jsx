import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getShipmentTypes } from '../../../api/shipment/shipment'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { COLORS } from '../../../constants'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const ShipmentType = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const [types, setTypes] = useState()
  const fetching = useSelector(selectIsFetching)

  useEffect(() => {
    getShipmentTypes(null, dispatch, setTypes, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      {!params?.choose && (
        <AddNew
          title={'New Shipment Type'}
          page={{
            name: 'new',
            screen: 'shipment_type',
          }}
        />
      )}

      {types?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={
              !params?.choose
                ? {
                    name: 'details',
                    screen: 'warehouse',
                    params: { type: 'Unmanaged', id: item.id },
                  }
                : {
                    name: 'new',
                    screen: 'shipment',
                    params: { type: item?.name },
                  }
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={styles.type}>{item?.description}</Text>
              {!params?.choose && (
                <Text style={styles.date}>{Date(item?.created_at)}</Text>
              )}
            </View>
          </SingleCard>
        )
      })}
    </ScrollView>
  )
}

export default ShipmentType
