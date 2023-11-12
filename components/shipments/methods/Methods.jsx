import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getTransportationMethods } from '../../../api/shipment/shipment'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { COLORS } from '../../../constants'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Methods = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [methods, setMethods] = useState()
  const fetching = useSelector(selectIsFetching)

  useEffect(() => {
    getTransportationMethods(null, dispatch, setMethods, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <AddNew
        title={'New Transportation Method'}
        page={{
          name: 'new',
          screen: 'shipment_method',
        }}
      />

      {methods?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'warehouse',
              params: { type: 'Unmanaged', id: item.id },
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={styles.type}>{item?.description}</Text>
              <Text style={styles.date}>{Date(item?.created_at)}</Text>
            </View>
          </SingleCard>
        )
      })}
    </ScrollView>
  )
}

export default Methods
