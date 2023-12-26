import { View } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { store } from '../../../store'

import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import CardDetail from '../../common/detail/CardDetail'
import { getTransits } from '../../../api/shipment/shipment'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const All = ({ fetching, refresh }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [transits, setTransits] = useState()
  useEffect(() => {
    getTransits(null, dispatch, setTransits, toast)
  }, [refresh])
  return (
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
          <SingleCard key={index} isOnlyText={true}>
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
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
