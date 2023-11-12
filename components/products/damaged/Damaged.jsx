import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { getDamagedProducts } from '../../../api/product/product'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Damaged = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [damaged, setDamaged] = useState()
  useEffect(() => {
    getDamagedProducts(null, dispatch, setDamaged, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Damaged Product'}
        page={{
          name: 'new',
          screen: 'damaged_product',
        }}
      />

      <View style={styles.listContainer}>
        {damaged?.data?.map((item, index) => {
          return (
            <SingleCard
              key={index}
              page={{
                name: 'details',
                screen: 'damaged_product',
                params: { id: item.id, name: item.name },
              }}
            >
              <Image
                style={styles.image}
                source={{ uri: item?.damageProducts?.clerance }}
              />

              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.damageProducts?.product_name}
                </Text>
                <Text style={styles.jobName}>
                  {item?.damageCustomer?.first_name}
                </Text>
                <Text style={styles.type}>{item?.productQty}</Text>
                <Text style={styles.type}>${item?.damageProducts?.price}</Text>
                <Text style={styles.type}>
                  {item?.damageStorage?.storage_name}
                </Text>
                <Text style={styles.type}>{item?.damage_cause}</Text>
                <Text style={styles.type}>{Date(item?.created_at)}</Text>
              </View>
            </SingleCard>
          )
        })}
      </View>
    </View>
  )
}

export default Damaged
