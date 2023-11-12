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

const Returned = ({ fetching }) => {
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
      <AddNew
        title={'New Returned Product'}
        page={{
          name: 'new',
          screen: 'returned_product',
        }}
      />

      {returned?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'returned_product',
              params: { type: 'Managed', id: item.id },
            }}
          >
            <Image
              style={styles.image}
              source={{ uri: item?.returnedProduct?.clerance }}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.returnedProduct?.product_name}
              </Text>
              <Text style={styles.jobName}>
                {item?.returnedCustomer?.first_name}
              </Text>
              <Text style={styles.type}>{item?.productQty}</Text>
              <Text style={styles.type}>${item?.returnedProduct?.price}</Text>
              <Text style={styles.type}>{item?.returned_reason}</Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Returned
