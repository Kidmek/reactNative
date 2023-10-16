import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './returned.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { COLORS } from '../../../constants'
import { getReturnedProducts } from '../../../api/product/product'

const Returned = ({ fetching }) => {
  const navigation = useNavigation()
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'returned_product',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Returned Product</Text>
      </TouchableOpacity>
      {returned?.data?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.warehouseContainer}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'returned_product',
                params: { type: 'Managed', id: item.id },
              })
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
                {item?.returnedCustomer.first_name}
              </Text>
              <Text style={styles.type}>{item?.productQty}</Text>
              <Text style={styles.type}>${item?.returnedProduct?.price}</Text>
              <Text style={styles.type}>{item?.returned_reason}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Returned
