import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getTransportationMethods } from '../../../api/shipment/shipment'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Methods = ({ refresh }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [methods, setMethods] = useState()

  useEffect(() => {
    getTransportationMethods(null, dispatch, setMethods, toast)
  }, [refresh])

  return (
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
          <SingleCard key={index} isOnlyText={true}>
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              <Text style={styles.name}>{item?.name}</Text>
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
