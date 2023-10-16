import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './warehouse.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { getWarehouses } from '../../../api/warehouse/warehouse'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { COLORS } from '../../../constants'

const Warehouse = ({ fetching }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [warehouses, setWarehouses] = useState()
  useEffect(() => {
    getWarehouses(null, dispatch, setWarehouses, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'warehouse',
            params: { type: 'Unmanaged' },
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Warehouse</Text>
      </TouchableOpacity>

      {warehouses?.results?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.warehouseContainer}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'warehouse',
                params: { type: 'Unmanaged', id: item.id },
              })
            }}
          >
            <Image
              style={styles.image}
              source={{ uri: item?.warehouse_images[0]?.images }}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.warehouse_name}
              </Text>
              <Text style={styles.jobName}>{item?.region}</Text>
              <Text style={styles.type}>{item?.city}</Text>
              <Text style={styles.type}>{item?.sub_city}</Text>
              <Text style={styles.type}>{item?.space + ' m\u00B2'} </Text>
              <Text style={styles.type}>${item?.full_price}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Warehouse
