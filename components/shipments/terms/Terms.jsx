import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import Search from '../../common/search/Search'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getShipmentTerms } from '../../../api/shipment/shipment'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../constants'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
const Terms = () => {
  const [searchQuery, setSearchQuery] = useState()
  const dispatch = store.dispatch
  const toast = useToast()
  const [terms, setTerms] = useState()
  const fetching = useSelector(selectIsFetching)

  useEffect(() => {
    getShipmentTerms(null, dispatch, setTerms, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Search
        onSearch={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AddNew
        title={'New Shipment Term'}
        page={{
          name: 'new',
          screen: 'warehouse',
        }}
      />

      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        terms?.data?.map((item, index) => {
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
                  {item?.term_name}
                </Text>
                <Text style={styles.jobName}>{item?.term_meta}</Text>

                <Text style={styles.type}>{Date(item?.created_at)}</Text>
              </View>
            </SingleCard>
          )
        })
      )}
    </ScrollView>
  )
}

export default Terms
