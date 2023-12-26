import { View, ScrollView } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getTransportations } from '../../../api/shipment/shipment'
import CardDetail from '../../common/detail/CardDetail'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Transportations = ({ refresh }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [transportations, setTransportations] = useState()

  useEffect(() => {
    getTransportations(null, dispatch, setTransportations, toast)
  }, [refresh])

  return (
    <ScrollView style={styles.container}>
      <AddNew
        title={'New Transportation'}
        page={{
          name: 'new',
          screen: 'transportation',
        }}
      />

      {transportations?.results?.map((item, index) => {
        return (
          <SingleCard key={index} isOnlyText={true}>
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              <CardDetail label={'Name'} value={item?.transportation_name} />
              <CardDetail
                label={'Transportation Type'}
                value={item?.TransportationTypeDetail?.name}
              />
              <CardDetail label={'Plate Number'} value={item?.licence_plate} />
              <CardDetail label={'Weight'} value={item?.limited_weight} />
              <CardDetail label={'Created At'} value={Date(item?.created_at)} />
            </View>
          </SingleCard>
        )
      })}
    </ScrollView>
  )
}

export default Transportations
