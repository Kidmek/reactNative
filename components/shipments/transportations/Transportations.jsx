import { View, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getTransportations } from '../../../api/shipment/shipment'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { COLORS } from '../../../constants'
import CardDetail from '../../common/detail/CardDetail'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Transportations = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [transportations, setTransportations] = useState()
  const fetching = useSelector(selectIsFetching)

  useEffect(() => {
    getTransportations(null, dispatch, setTransportations, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <AddNew
        title={'New Transportation'}
        page={{
          name: 'new',
          screen: 'transportation',
        }}
      />

      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        transportations?.results?.map((item, index) => {
          return (
            <SingleCard key={index} isOnlyText={true}>
              <View style={styles.onlyTextContainer}>
                <CardDetail label={'Name'} value={item?.transportation_name} />
                <CardDetail
                  label={'Transportation Type'}
                  value={item?.TransportationTypeDetail?.name}
                />
                <CardDetail
                  label={'Plate Number'}
                  value={item?.licence_plate}
                />
                <CardDetail label={'Weight'} value={item?.limited_weight} />
                <CardDetail
                  label={'Created At'}
                  value={Date(item?.created_at)}
                />
              </View>
            </SingleCard>
          )
        })
      )}
    </ScrollView>
  )
}

export default Transportations
