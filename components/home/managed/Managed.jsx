import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { getManaged } from '../../../api/warehouse/warehouse'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { mSQUARE } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import styles from '../../common/styles/common.style'

const Managed = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [managed, setManaged] = useState()
  useEffect(() => {
    getManaged(null, dispatch, setManaged, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Managed Warehouse'}
        page={{
          name: 'new',
          screen: 'warehouse',
          params: { type: 'Managed' },
        }}
      />

      {managed?.warehouse?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'warehouse',
              params: { type: 'Unmanaged', id: item.id },
            }}
          >
            <Image style={styles.image} source={{ uri: item.images }} />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.warehouse_name}
              </Text>
              <Text style={styles.jobName}>{item?.region}</Text>
              <Text style={styles.type}>{item?.city}</Text>
              <Text style={styles.type}>{item?.sub_city}</Text>
              <Text style={styles.type}>
                {item?.storage_space + ' ' + mSQUARE}
              </Text>
              <Text style={styles.type}>{item?.status}</Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Managed
