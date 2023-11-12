import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../constants'
import { getOrderTypes } from '../../../api/order/order'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
const OrderTypes = ({ params }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const [orderTypes, setOrderTypes] = useState()
  useEffect(() => {
    getOrderTypes(null, dispatch, setOrderTypes, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      {!params?.choose && (
        <View style={styles.cardsContainer}>
          <AddNew
            title={'New Order Type'}
            page={{
              name: 'new',
              screen: 'order_type',
            }}
          />
        </View>
      )}
      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        orderTypes?.results?.map((item, index) => {
          return (
            <SingleCard
              key={index}
              page={
                params.choose
                  ? {
                      name: 'new',
                      screen: 'choose_for_order',
                      params: { type: item?.ordertype_name },
                    }
                  : {}
              }
            >
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.ordertype_name}
                </Text>
                <Text style={styles.type}>{item?.meta}</Text>
              </View>
            </SingleCard>
          )
        })
      )}
    </ScrollView>
  )
}

export default OrderTypes
