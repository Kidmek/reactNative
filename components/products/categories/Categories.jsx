import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './categories.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { COLORS } from '../../../constants'
import { getProductCategories } from '../../../api/product/product'

const Categories = ({ fetching }) => {
  const navigation = useNavigation()
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'product_category',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Product Category</Text>
      </TouchableOpacity>

      {productCategory?.data?.map((item, index) => {
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
                {item?.created_at}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Categories
