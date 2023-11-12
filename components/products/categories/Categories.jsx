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
          <TouchableOpacity key={index} style={styles.warehouseContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.category_name}
              </Text>
              <Text style={styles.name} numberOfLines={1}>
                Description: {item?.category_meta}
              </Text>
              <Text style={styles.type}>
                <Text style={styles.label}>Created At: </Text>
                {Date(item?.created_at)}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Categories
