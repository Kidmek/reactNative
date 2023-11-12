import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants'
import { store } from '../../../store'
import styles from '../../common/styles/common.style'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import CardDetail from '../../common/detail/CardDetail'
import { getPorts } from '../../../api/shipment/shipment'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const All = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [ports, setPorts] = useState()

  useEffect(() => {
    getPorts(null, dispatch, setPorts, toast)
  }, [])
  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Port'}
        page={{
          name: 'new',
          screen: 'port',
        }}
      />

      {ports?.results?.map((item, index) => {
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
              <CardDetail label={'Country'} value={item?.country} />
              <CardDetail label={'City'} value={item?.city} />
              <CardDetail label={'Port Name'} value={item?.name} />
              <CardDetail label={'Description'} value={item?.discription} />
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
