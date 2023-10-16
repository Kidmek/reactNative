import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './managed.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { getManaged } from '../../../api/warehouse/warehouse'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { COLORS } from '../../../constants'

const Managed = ({ fetching }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [managed, setManaged] = useState()
  useEffect(() => {
    getManaged(null, dispatch, setManaged, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'warehouse',
            params: { type: 'Managed' },
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Managed Warehouse</Text>
      </TouchableOpacity>
      {managed?.warehouse?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.warehouseContainer}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'warehouse',
                params: { type: 'Managed', id: item.id },
              })
            }}
          >
            <Image style={styles.image} source={{ uri: item.images }} />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.warehouse_name}
              </Text>
              <Text style={styles.jobName}>{item?.region}</Text>
              <Text style={styles.type}>{item?.city}</Text>
              <Text style={styles.type}>{item?.sub_city}</Text>
              <Text style={styles.type}>
                {item?.storage_space + ' m\u00B2'}{' '}
              </Text>
              <Text style={styles.type}>{item?.status}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Managed
