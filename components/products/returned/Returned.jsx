import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { getReturnedProducts } from '../../../api/product/product'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Returned = ({ fetching, isAdmin }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [returned, setReturned] = useState()
  useEffect(() => {
    getReturnedProducts(null, dispatch, setReturned, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      {isAdmin && (
        <AddNew
          title={'New Returned Product'}
          page={{
            name: 'new',
            screen: 'returned_product',
          }}
        />
      )}
      {returned?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'returned_product',
              params: { type: 'Managed', id: item.id },
            }}
            isOnlyText={true}
          >
            <Image
              style={styles.image}
              source={{ uri: item?.returnedProduct?.clerance }}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.productdetail?.product_name}
              </Text>
              <Text style={styles.jobName}>{item?.userdetail?.first_name}</Text>
              <Text style={styles.type}>{item?.productqty}</Text>
              <Text style={styles.type}>{item.price + ' ETB'}</Text>
              <Text style={styles.type}>{item?.returned_reason}</Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Returned
