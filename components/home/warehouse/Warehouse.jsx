import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { getWarehouses } from '../../../api/warehouse/warehouse'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { WAREHOUSE, mSQUARE } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Warehouse = ({ fetching, choose }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [warehouses, setWarehouses] = useState()
  useEffect(() => {
    getWarehouses(null, dispatch, setWarehouses, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      {!choose && (
        <AddNew
          title={'New Warehouse'}
          page={{
            name: 'new',
            screen: 'warehouse',
            params: { type: 'Unmanaged' },
          }}
        />
      )}

      {warehouses?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={
              !choose
                ? {
                    name: 'details',
                    screen: 'warehouse',
                    params: { type: 'Unmanaged', id: item.id },
                  }
                : {
                    name: 'new',
                    screen: 'order',
                    params: { type: WAREHOUSE, id: item.id },
                  }
            }
          >
            <Image
              style={styles.image}
              source={{ uri: item?.warehouse_images[0]?.images }}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.warehouse_name}
              </Text>
              <Text style={styles.jobName}>{item?.region}</Text>
              <Text style={styles.type}>{item?.city}</Text>
              <Text style={styles.type}>{item?.sub_city}</Text>
              <Text style={styles.type}>{item?.space + ' ' + mSQUARE} </Text>
              <Text style={styles.type}>${item?.full_price}</Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Warehouse
