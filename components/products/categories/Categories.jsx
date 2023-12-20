import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { getProductCategories } from '../../../api/product/product'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Categories = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [productCategory, setProductCategory] = useState()
  useEffect(() => {
    getProductCategories(null, dispatch, setProductCategory, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Product Category'}
        page={{
          name: 'new',
          screen: 'product_category',
        }}
      />

      {productCategory?.results?.map((item, index) => {
        return (
          <SingleCard key={index} isOnlyText={true}>
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.category_name}
              </Text>
              <Text>{item?.category_meta}</Text>
              <Text style={styles.type}>{Date(item?.created_at)}</Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Categories
