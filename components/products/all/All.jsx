import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './all.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { getWarehouses } from '../../../api/warehouse/warehouse'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { COLORS } from '../../../constants'
import { getAllProducts } from '../../../api/product/product'

const All = ({ fetching }) => {
  const navigation = useNavigation()
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'product',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Product</Text>
      </TouchableOpacity>

      {products?.data?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.warehouseContainer}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'product',
                params: { type: 'Unmanaged', id: item.id },
              })
            }}
          >
            <Image style={styles.image} source={{ uri: item?.clerance }} />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.product_name}
              </Text>
              <Text style={styles.jobName}>
                {item?.types?.product_type_name}
              </Text>
              <Text style={styles.type}>{item?.category?.category_name}</Text>
              <Text style={styles.type}>{item?.quantity}</Text>
              <Text style={styles.type}>{item?.customer?.first_name}</Text>
              <Text style={styles.type}>${item?.price}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default All
