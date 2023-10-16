import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './types.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { COLORS } from '../../../constants'
import { getProductTypes } from '../../../api/product/product'

const Types = ({ fetching }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [productTypes, setProductTypes] = useState()
  useEffect(() => {
    getProductTypes(null, dispatch, setProductTypes, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'product_type',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Product Type</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        {productTypes?.data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.storageTypeContainer}
              onPress={() => {
                navigation.navigate('details', {
                  screen: 'product_type',
                  params: { name: item?.storage_name, id: item?.id },
                })
              }}
            >
              {/* <AntDesign name='storage' size={40} color={'black'} /> */}
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.product_type_name}
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
    </View>
  )
}

export default Types
