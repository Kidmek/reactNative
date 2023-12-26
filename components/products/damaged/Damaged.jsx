import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { getDamagedProducts } from '../../../api/product/product'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Damaged = ({ refresh, isAdmin }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [damaged, setDamaged] = useState()
  useEffect(() => {
    getDamagedProducts(null, dispatch, setDamaged, toast)
  }, [refresh])

  return (
    <View style={styles.container}>
      {isAdmin && (
        <AddNew
          title={'New Damaged Product'}
          page={{
            name: 'new',
            screen: 'damaged_product',
          }}
        />
      )}
      <View style={styles.listContainer}>
        {damaged?.data?.map((item, index) => {
          return (
            <SingleCard key={index} isOnlyText={true}>
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
