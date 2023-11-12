import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { COLORS } from '../../../constants'
import { store } from '../../../store'

import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import CardDetail from '../../common/detail/CardDetail'
import { getTransits } from '../../../api/shipment/shipment'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const All = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [transits, setTransits] = useState()
  useEffect(() => {
    getTransits(null, dispatch, setTransits, toast)
  }, [])
  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Transit'}
        page={{
          name: 'new',
          screen: 'transit',
        }}
      />

      {transits?.results?.map((item, index) => {
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
              <CardDetail
                label={'Customer'}
                value={item?.productdetail?.userDetail?.first_name}
              />
              <CardDetail
                label={'Product'}
                value={item?.productdetail?.product_name}
              />
              <CardDetail
                label={'Transitor'}
                value={item?.transitordetail?.first_name}
              />
              <CardDetail
                label={'Port Name'}
                value={item?.transitordetail?.portdetail?.name}
              />
              <CardDetail label={'Status'} value={item?.status} />
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
