import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { getAllProducts } from '../../../api/product/product'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const All = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [products, setProducts] = useState()
  useEffect(() => {
    getAllProducts(null, dispatch, setProducts, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Product'}
        page={{
          name: 'new',
          screen: 'product',
        }}
      />

      {products?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'product',
              params: { type: 'Unmanaged', id: item.id },
            }}
          >
            <Image style={styles.image} source={{ uri: item?.clerance }} />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.product_name}
              </Text>
              <Text style={styles.jobName}>
                {item?.ProductTypeDetail?.product_type_name}
              </Text>
              <Text style={styles.type}>
                {item?.catagorydetail?.category_name}
              </Text>
              <Text style={styles.type}>{item?.quantity}</Text>
              <Text style={styles.type}>{item?.userdetail?.first_name}</Text>
              <Text style={styles.type}>${item?.price}</Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
