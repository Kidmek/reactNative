import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../returned/returned.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { useNavigation } from 'expo-router'
import { getDamagedProducts } from '../../../api/product/product'

const Damaged = ({ fetching }) => {
  const navigation = useNavigation()
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'damaged_product',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Damaged Product</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        {damaged?.data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.warehouseContainer}
              onPress={() => {
                navigation.navigate('details', {
                  screen: 'damaged_product',
                  params: {
                    id: item.id,
                    name: item.name,
                  },
                })
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
                <Text style={styles.type}>{item?.created_at}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default Damaged
